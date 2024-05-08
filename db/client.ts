import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) throw new Error("Database url must be defined.");

export const pool = new Pool({
	connectionString: connectionString,
});

export const db = drizzle(pool, { schema, logger: true });
