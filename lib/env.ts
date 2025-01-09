import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // GLOBAL
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    HOST_NAME: z.string().url(),

    // DATABASE
    DATABASE_URL: z.string().min(1),

    // AUTH
    AUTH_SECRET: z.string().min(1),
    AUTH_GITHUB_ID: z.string().min(1),
    AUTH_GITHUB_SECRET: z.string().min(1),
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),

    // RESEND
    RESEND_API_KEY: z.string().min(1),

    // STORAGE
    STORAGE_AWS_ACCESS_KEY_ID: z.string().min(1),
    STORAGE_AWS_SECRET_ACCESS_KEY: z.string().min(1),
    STORAGE_AWS_BUCKET_NAME: z.string().min(1),
    STORAGE_AWS_REGION: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    HOST_NAME: process.env.HOST_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    STORAGE_AWS_ACCESS_KEY_ID: process.env.STORAGE_AWS_ACCESS_KEY_ID,
    STORAGE_AWS_SECRET_ACCESS_KEY: process.env.STORAGE_AWS_SECRET_ACCESS_KEY,
    STORAGE_AWS_BUCKET_NAME: process.env.STORAGE_AWS_BUCKET_NAME,
    STORAGE_AWS_REGION: process.env.STORAGE_AWS_REGION,
  },
});
