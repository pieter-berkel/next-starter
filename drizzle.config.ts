import "dotenv/config";

import { Config } from "drizzle-kit";

const config: Config = {
  dialect: "mysql",
  schema: "./db/schema",
  out: "./db/drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};

export default config;
