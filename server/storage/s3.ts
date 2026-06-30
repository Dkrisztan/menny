import { S3Client, GetObjectCommand, DeleteObjectCommand, PutObjectCommand, HeadBucketCommand, CreateBucketCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '../env.ts'

const s3 = new S3Client({
  endpoint: env.S3_ENDPOINT,
  region: 'us-east-1',
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
  forcePathStyle: true,
})

export async function ensureBucket() {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: env.S3_BUCKET }))
  } catch {
    await s3.send(new CreateBucketCommand({ Bucket: env.S3_BUCKET }))
  }
}

export async function getPresignedUploadUrl(key: string, contentType: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
    ContentType: contentType,
  })
  return await getSignedUrl(s3, command, { expiresIn: 600 })
}

export function getPublicUrl(key: string): string {
  return `${env.BETTER_AUTH_URL}/uploads/${key}`
}

export async function getObject(key: string) {
  const response = await s3.send(new GetObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
  }))
  return response.Body
}

export async function deleteObject(key: string): Promise<void> {
  await s3.send(new DeleteObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
  }))
}
