import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/mysql2";
import mysql, { Pool } from "mysql2/promise";

export * as schema from "./schema";

let database;
let connection: Pool;

if (env.NODE_ENV === "production") {
  connection = mysql.createPool(env.DATABASE_URL);
  database = drizzle(connection, {});
} else {
  if (!(global as any).database) {
    connection = mysql.createPool(env.DATABASE_URL);
    (global as any).database = drizzle(connection, {});
  }
  database = (global as any).database;
}

export { database, connection };
