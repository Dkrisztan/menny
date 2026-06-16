CREATE TABLE "venue_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"total_seats" integer DEFAULT 0 NOT NULL,
	"total_tables" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
