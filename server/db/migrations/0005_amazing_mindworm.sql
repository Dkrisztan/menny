ALTER TABLE "reservations" ADD COLUMN "confirmed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ADD COLUMN "confirm_token" text DEFAULT '' NOT NULL;--> statement-breakpoint
UPDATE "reservations" SET "confirm_token" = gen_random_uuid()::text WHERE "confirm_token" = '';--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "confirm_token" DROP DEFAULT;
