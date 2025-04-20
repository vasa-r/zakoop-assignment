import "dotenv/config";
import { getEnv } from "../utils/get-env";

export const envConfig = {
  server: {
    port: getEnv("PORT", "8000"),
    env: getEnv("NODE_ENV", "production"),
    allowedOrigins: getEnv("ALLOWED_ORIGINS", "http://localhost:5173"),
  },
  mongo: {
    url: getEnv("MONGO_URI"),
  },
  client: {
    url: getEnv("FRONTEND_URL"),
  },
};
