import { defineConfig } from "drizzle-kit";

export default defineConfig({
	driver: "pg",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		connectionString: process.env.DATABASE_URL!,
	},
	out: "./lib/db/out/",
	schema: "./lib/db/out/schema.ts",
	verbose: true,
	strict: true,
	introspect: {
		casing: "camel",
	},
});
