import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { sql } from 'drizzle-orm';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DrizzleProvider) private db: NodePgDatabase<typeof schema>,
  ) {}

  async findUserById(id: string) {
    return this.db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(sql`${schema.users.id} = ${id}`);
  }
  async findUserByGoogleId(googleId: string) {
    const foundUsers = await this.db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(sql`${schema.users.googleId} = ${googleId}`)
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
}
