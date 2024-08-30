// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const config = {
  api: {
    port: process.env.PORT || 3000,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  urls: {
    frontEnd: process.env.FRONTEND_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  stripe: {
    secret: process.env.STRIPE_SECRET_KEY,
    clientId: process.env.STRIPE_CLIENT_ID,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    redirectUri: process.env.STRIPE_REDIRECT_URI,
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
