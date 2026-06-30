import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  S3_ENDPOINT: z.string().url(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_BUCKET: z.string().default('menny-uploads'),
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string().default('Menny* <krisztidancs@gmail.com>'),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url().default('http://localhost:3000'),
  ADMIN_URL: z.string().url().default('http://localhost:5174'),
  PORT: z.coerce.number().default(3000),
  ADMIN_PORT: z.coerce.number().default(3001),
})

export const env = envSchema.parse(process.env)
