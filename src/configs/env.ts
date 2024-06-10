import { z } from "zod";

const envSchema = z.object({
  DB_URL: z.string().url(),
  DB_NAME: z.string().default("requests"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("debug"),
});

export default envSchema.parse({
  DB_URL: process.env.DB_URL,
  ...process.env,
});
