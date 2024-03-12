import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT || 9000,
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/lpg?directConnection=true",
  HASH_SALT: Number(process.env.HASH_SALT) || 10,
  JWT_KEY: process.env.JWT_KEY || "secret",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "secret",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "secret",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "secret",
};
export default ENV;
