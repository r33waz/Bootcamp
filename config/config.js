const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  JWT_TOKEN: process.env.JWT_TOKEN,
  ////////////////////////////////
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  NAME: process.env.NAME,
  FROM_EMAIL: process.env.FROM_EMAIL,
  ///////////////////////////////////
  MESSAGE: process.env.MESSAGE,
  TOKEN_EXPIRE: process.env.TOKEN_EXPIRE,

  //file storage keys
  CLOUDINARY_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.API_KEY,
  CLOUDINARY_API_SECRET: process.env.API_SECRET,
};

export default config;
