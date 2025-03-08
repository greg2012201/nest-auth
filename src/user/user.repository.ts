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
}
