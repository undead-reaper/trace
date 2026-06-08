/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    // Client-side environment variables
    readonly VITE_CLERK_PUBLISHABLE_KEY: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  // Server-side environment variables
  namespace NodeJS {
    interface ProcessEnv {
      readonly CLERK_SECRET_KEY: string
      readonly CLERK_SIGN_IN_URL: string
      readonly CLERK_SIGN_UP_URL: string
      readonly CLERK_AFTER_SIGN_IN_URL: string
      readonly CLERK_AFTER_SIGN_UP_URL: string
      readonly DATABASE_HOST: string
      readonly DATABASE_PORT: string
      readonly DATABASE_NAME: string
      readonly DATABASE_USER: string
      readonly DATABASE_PASSWORD: string
      readonly DATABASE_CA_CERT: string
      readonly RAILPACK_BUILD_CMD: string
    }
  }
}

export {}
