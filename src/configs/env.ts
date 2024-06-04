import { cleanEnv, Spec, str, url, ValidatorSpec } from "envalid";
import { z } from "zod";

// https://github.com/af/envalid
// ==========  environment definition and validation ==========

// const envVars = {
//   DB_URL: process.env.DB_URL,
//   DB_USERNAME: process.env.DB_USERNAME,
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   DB_ADDRESS: process.env.DB_ADDRESS,
//   DB_PROTOCOL: process.env.DB_PROTOCOL,
//   DB_NAME: process.env.DB_NAME,
//   LOG_LEVEL: process.env.LOG_LEVEL,
//   NEXT_PUBLIC_DB_URL: process.env.NEXT_PUBLIC_DB_URL,
// };

// type EnvKey = keyof typeof envVars;

const isServer = typeof window === "undefined";

// const optionalVarOpts: Spec<string> = { default: undefined };
// const serverVarOpts = isServer ? undefined : optionalVarOpts;


// const envConfig: Record<EnvKey, ValidatorSpec<string>> = {
//   DB_ADDRESS: str({default: '127.0.0.1:5984'}),
//   DB_PROTOCOL: str({choices: ['http', 'https'], default: 'http'}),
//   DB_USERNAME: str(serverVarOpts),
//   DB_PASSWORD: str(serverVarOpts),
//   DB_NAME: str(serverVarOpts),
//   DB_URL: url(serverVarOpts),
//   LOG_LEVEL: str({
//     choices: ["error", "warn", "info", "debug"],
//     default: "info",
//     devDefault: "debug",
//   }),
//   NEXT_PUBLIC_DB_URL: str(serverVarOpts)
// };
// const env = cleanEnv(process.env, envConfig);

// export default env;

const envSchema = z.object({
  DB_URL: z.string().url(),
  DB_NAME: z.string().default("requests"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("debug")
});


export default envSchema.parse({
  DB_URL: isServer ? process.env.DB_URL : process.env.NEXT_PUBLIC_DB_URL,
  ...process.env
});

