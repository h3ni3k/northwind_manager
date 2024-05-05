import { defineConfig } from "drizzle-kit";

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) throw new Error("Database url must be defined.");

export default defineConfig({
	driver: "pg",
	dbCredentials: {
		connectionString: connectionString,
	},
	schema: "./db/schema.ts",
	out: "./db/drizzle",
	verbose: true,
	strict: true,
	introspect: {
		casing: "camel",
	},
});
