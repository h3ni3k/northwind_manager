import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from ".";

(async function main() {
	await migrate(db, { migrationsFolder: "./out/" });
	await pool.end();
})();
