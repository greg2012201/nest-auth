ALTER TABLE "dropbox_accounts" ALTER COLUMN "access_token" SET DATA TYPE varchar(4000);--> statement-breakpoint
ALTER TABLE "dropbox_accounts" ALTER COLUMN "refresh_token" SET DATA TYPE varchar(4000);