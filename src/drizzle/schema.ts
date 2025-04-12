import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isConnectedToDropbox: boolean('is_connected_to_dropbox').default(false),
  googleId: varchar('google_id', { length: 255 }).unique(),
});

export const dropboxAccounts = pgTable('dropbox_accounts', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull(),
  dropboxId: varchar('dropbox_id', { length: 255 }).notNull().unique(),
  accessToken: varchar('access_token', { length: 4000 }).notNull(),
  refreshToken: varchar('refresh_token', { length: 4000 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const usersToDropboxAccounts = pgTable('users_to_dropbox_accounts', {
  userId: serial('user_id')
    .notNull()
    .references(() => users.id),
  dropboxAccountId: serial('dropbox_account_id')
    .notNull()
    .references(() => dropboxAccounts.id),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type DropboxAccount = typeof dropboxAccounts.$inferSelect;
export type NewDropboxAccount = typeof dropboxAccounts.$inferInsert;
export type UserToDropboxAccount = typeof usersToDropboxAccounts.$inferSelect;
export type NewUserToDropboxAccount =
  typeof usersToDropboxAccounts.$inferInsert;
