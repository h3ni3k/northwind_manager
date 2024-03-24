import { drizzle } from "drizzle-orm/node-postgres/driver";
import { Pool } from "pg";
import * as schema from "./out/schema";

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
