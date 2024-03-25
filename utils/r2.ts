import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
"use server"

const R2_ACCOUNT_ID = process.env.NEXT_PUBLIC_R2_ACCOUNT_ID;
const ACCESS_KEY_ID =  process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY;
const R2_UPLOAD_BUCKET = process.env.NEXT_PUBLIC_R2_UPLOAD_BUCKET

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID as string,
    secretAccessKey: SECRET_ACCESS_KEY as string
  }
})

export const uploadFile = async (file_name: string) => {
  const presigned_url = await getSignedUrl(s3, new PutObjectCommand({
    Bucket: process.env.R2_UPLOAD_BUCKET,
    Key: file_name
  }), {
    expiresIn: 3600
  });

  return {
    url: presigned_url
  }
}