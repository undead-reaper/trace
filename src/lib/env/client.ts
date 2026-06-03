import { createEnv } from "@t3-oss/env-core"
import z from "zod"

export const clientEnv = createEnv({
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  clientPrefix: "VITE_",
  runtimeEnvStrict: import.meta.env,
  emptyStringAsUndefined: true,
})
