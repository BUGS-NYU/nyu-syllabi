"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID =  process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_UPLOAD_BUCKET = process.env.R2_UPLOAD_BUCKET

if (!R2_ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !R2_UPLOAD_BUCKET) {
  throw new Error("Missing R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, or R2_UPLOAD_BUCKET environment variable")
}

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
    Bucket: R2_UPLOAD_BUCKET,
    Key: file_name
  }), {
    expiresIn: 3600
  });

  return {
    url: presigned_url
  }
}