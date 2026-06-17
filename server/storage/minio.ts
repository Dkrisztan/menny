import * as Minio from 'minio'
import { env } from '../env.ts'

const minioClient = new Minio.Client({
  endPoint: env.MINIO_ENDPOINT,
  port: env.MINIO_PORT,
  useSSL: false,
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
})

export async function ensureBucket() {
  const exists = await minioClient.bucketExists(env.MINIO_BUCKET)
  if (!exists) {
    await minioClient.makeBucket(env.MINIO_BUCKET)
  }
  const policy = JSON.stringify({
    Version: '2012-10-17',
    Statement: [{
      Effect: 'Allow',
      Principal: { AWS: ['*'] },
      Action: ['s3:GetObject'],
      Resource: [`arn:aws:s3:::${env.MINIO_BUCKET}/*`],
    }],
  })
  await minioClient.setBucketPolicy(env.MINIO_BUCKET, policy)
}

export async function getPresignedUploadUrl(key: string, _contentType: string): Promise<string> {
  return await minioClient.presignedPutObject(env.MINIO_BUCKET, key, 10 * 60)
}

export function getPublicUrl(key: string): string {
  return `http://${env.MINIO_ENDPOINT}:${env.MINIO_PORT}/${env.MINIO_BUCKET}/${key}`
}

export async function deleteObject(key: string): Promise<void> {
  await minioClient.removeObject(env.MINIO_BUCKET, key)
}
