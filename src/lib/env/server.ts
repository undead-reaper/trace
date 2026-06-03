import { createEnv } from "@t3-oss/env-core"
import z from "zod"

export const serverEnv = createEnv({
  server: {
    CLERK_SECRET_KEY: z.string(),
    CLERK_SIGN_IN_URL: z.string(),
    CLERK_SIGN_UP_URL: z.string(),
    CLERK_AFTER_SIGN_IN_URL: z.string(),
    CLERK_AFTER_SIGN_UP_URL: z.string(),
  },
  runtimeEnvStrict: process.env,
  emptyStringAsUndefined: true,
})
