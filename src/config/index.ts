require('dotenv').config();

export const config = {
  db: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  stripe: {
    secret: process.env.STRIPE_SECRET_KEY,
  },
  security: {
    encryptionKey: process.env.ENCRYPTION_KEY,
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    s3: {
      bucketName: process.env.AWS_S3_BUCKET_NAME,
    },
  },
};
