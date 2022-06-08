// Enviroment Constants
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_REGION,
  AWS_S3_BUCKET_NAME,
  JWT_SECRET
} = process.env;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  AWS_S3: {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME,
    AWS_S3_REGION
  },
  JWT_SECRET: JWT_SECRET || 'somesecret',
  DB: {
    MONGO_USERNAME,
    MONGO_DB,
    MONGO_PASSWORD,
    URL: `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}`
  }
};
