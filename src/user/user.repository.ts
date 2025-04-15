import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { eq, exists, is } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DrizzleProvider) private db: NodePgDatabase<typeof schema>,
    private configService: ConfigService,
    private encryptionService: EncryptionService,
  ) {}

  async findUserById(id: number) {
    const results = await this.db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);
    return results[0];
  }
  async findUserByGoogleId(googleId: string) {
    const foundUsers = await this.db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(eq(schema.users.googleId, googleId))
      .limit(1);

    return foundUsers[0];
  }

  async getAllUsers() {
    return this.db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        isConnectedToDropbox: schema.users.isConnectedToDropbox,
      })
      .from(schema.users);
  }
  async createUser({
    id: googleId,
    email,
    name,
  }: {
    id: string;
    email: string;
    name: string;
  }) {
    const result = await this.db
      .insert(schema.users)
      .values({ email, name, googleId })
      .returning({ id: schema.users.id });
    return result[0];
  }

  async connectDropboxAccount({
    dropboxId,
    userId,
    accessToken,
    refreshToken,
  }: {
    dropboxId: string;
    userId: number;
    accessToken: string;
    refreshToken: string;
  }) {
    const encryptedAccessToken = this.encryptionService.encrypt(accessToken);
    const encryptedRefreshToken = this.encryptionService.encrypt(refreshToken);

    let result: { id: schema.User['id'] }[] | null = null;
    await this.db.transaction(async (tx) => {
      const [dropboxAccount] = await tx
        .insert(schema.dropboxAccounts)
        .values({
          dropboxId,
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken,
        })
        .onConflictDoUpdate({
          target: schema.dropboxAccounts.dropboxId,
          set: {
            accessToken: encryptedAccessToken,
            refreshToken: encryptedRefreshToken,
          },
        })
        .returning({ id: schema.dropboxAccounts.id });
      result = await tx
        .insert(schema.usersToDropboxAccounts)
        .values({
          userId: userId,
          dropboxAccountId: dropboxAccount.id,
        })
        .onConflictDoNothing()
        .returning({ id: schema.usersToDropboxAccounts.userId });

      await tx
        .update(schema.users)
        .set({ isConnectedToDropbox: true })
        .where(eq(schema.users.id, userId));
    });
    return result?.[0];
  }
}
