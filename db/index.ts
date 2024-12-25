import { env } from "@/lib/env";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql, { Pool } from "mysql2/promise";

import * as schema from "./schema";

let database: MySql2Database<typeof schema>;
let connection: Pool;

if (env.NODE_ENV === "production") {
  connection = mysql.createPool(env.DATABASE_URL);
  database = drizzle(connection, { schema, mode: "default" });
} else {
  if (!(global as any).database) {
    connection = mysql.createPool(env.DATABASE_URL);
    (global as any).database = drizzle(connection, { schema, mode: "default" });
  }
  database = (global as any).database;
}

export { database, connection, schema };
