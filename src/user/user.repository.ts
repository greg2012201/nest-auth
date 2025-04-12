import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';
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
    return this.db.select().from(schema.users);
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
    const [dropboxAccount] = await this.db
      .insert(schema.dropboxAccounts)
      .values({
        dropboxId,
        userId,
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
      })
      .returning({ id: schema.dropboxAccounts.id });

    const result = await this.db
      .insert(schema.usersToDropboxAccounts)
      .values({
        userId: userId,
        dropboxAccountId: dropboxAccount.id,
      })
      .returning({ id: schema.usersToDropboxAccounts.userId });
    return result[0];
  }
}
