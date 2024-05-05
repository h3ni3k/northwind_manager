import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./client";

async function main() {
	await migrate(db, { migrationsFolder: "./db/drizzle" });
	await pool.end();
}

main();
