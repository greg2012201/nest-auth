CREATE TABLE "dropbox_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"dropbox_id" varchar(255) NOT NULL,
	"access_token" varchar(255) NOT NULL,
	"refresh_token" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "dropbox_accounts_dropbox_id_unique" UNIQUE("dropbox_id")
);
--> statement-breakpoint
CREATE TABLE "users_to_dropbox_accounts" (
	"user_id" serial NOT NULL,
	"dropbox_account_id" serial NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users_to_dropbox_accounts" ADD CONSTRAINT "users_to_dropbox_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_dropbox_accounts" ADD CONSTRAINT "users_to_dropbox_accounts_dropbox_account_id_dropbox_accounts_id_fk" FOREIGN KEY ("dropbox_account_id") REFERENCES "public"."dropbox_accounts"("id") ON DELETE no action ON UPDATE no action;