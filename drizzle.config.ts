import { defineConfig } from "drizzle-kit";

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) throw new Error("Database url must be defined.");

export default defineConfig({
	dialect: "postgresql",
	dbCredentials: {
		url: connectionString,
	},
	schema: "./db/schema.ts",
	out: "./db/drizzle",
	verbose: true,
	strict: true,
	introspect: {
		casing: "camel",
	},
	migrations: {
		schema: "public",
		table: "migrations",
	},
});
