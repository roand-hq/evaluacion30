import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {
    URI: process.env.DB_URI,
  },
  server: {
    PUERTO: process.env.PORT,
  },
  JWT: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES,
  },
  email: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_api_secret: process.env.CLOUD_API_SECRET,
  },
};
