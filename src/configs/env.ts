import { cleanEnv, Spec, str, url, ValidatorSpec } from "envalid";

// https://github.com/af/envalid
// ==========  environment definition and validation ==========

const envVars = {
  DB_URL: process.env.DB_URL,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  LOG_LEVEL: process.env.LOG_LEVEL,
};

type EnvKey = keyof typeof envVars;

const envConfig: Record<EnvKey, ValidatorSpec<string>> = {
  DB_URL: url({
    default:
      "https://admin:password123@8d45-136-226-112-201.ngrok-free.app/requests",
  }),
  DB_USERNAME: str({ default: "admin" }),
  DB_PASSWORD: str({ default: "password123" }),
  LOG_LEVEL: str({
    choices: ["error", "warn", "info", "debug"],
    default: "info",
    devDefault: "debug",
  }),
};
const env = cleanEnv(process.env, envConfig);

export default env;
