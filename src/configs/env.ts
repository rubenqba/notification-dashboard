import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    DB_URL: z.string().url(),
    DB_NAME: z.string().default("requests"),
    LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("debug"),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
    LOG_LEVEL: process.env.LOG_LEVEL,
  },
  // skip validation at build time as secrets will not be available
  skipValidation: true,
});
