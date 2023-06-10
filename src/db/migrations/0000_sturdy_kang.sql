CREATE TABLE IF NOT EXISTS "Friendships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id1" uuid NOT NULL,
	"user_id2" uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS "PendingFriendships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sender_id" uuid NOT NULL,
	"receiver_id" uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS "TresorPermissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"safe_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"is_owner" boolean NOT NULL,
	"can_fill" boolean NOT NULL,
	"can_see" boolean NOT NULL,
	"can_read" boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS "Tresors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"img_url" varchar(10000) NOT NULL,
	"filled" boolean NOT NULL,
	"auto_unlock" boolean NOT NULL,
	"locked_until" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "Users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "Friendships" ADD CONSTRAINT "Friendships_user_id1_Users_id_fk" FOREIGN KEY ("user_id1") REFERENCES "Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Friendships" ADD CONSTRAINT "Friendships_user_id2_Users_id_fk" FOREIGN KEY ("user_id2") REFERENCES "Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "PendingFriendships" ADD CONSTRAINT "PendingFriendships_sender_id_Users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "PendingFriendships" ADD CONSTRAINT "PendingFriendships_receiver_id_Users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "TresorPermissions" ADD CONSTRAINT "TresorPermissions_safe_id_Tresors_id_fk" FOREIGN KEY ("safe_id") REFERENCES "Tresors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "TresorPermissions" ADD CONSTRAINT "TresorPermissions_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
