import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  MINIO_ENDPOINT: z.string().default('localhost'),
  MINIO_PORT: z.coerce.number().default(9000),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  MINIO_BUCKET: z.string().default('menny-uploads'),
  RESEND_API_KEY: z.string(),
  RESEND_FROM: z.string().default('Menny* <noreply@mennykulturkocsma.hu>'),
  PORT: z.coerce.number().default(3000),
})

export const env = envSchema.parse(process.env)
