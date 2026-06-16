CREATE TABLE "weekly_schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"day_of_week" integer NOT NULL,
	"event_name" text NOT NULL,
	"time" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
