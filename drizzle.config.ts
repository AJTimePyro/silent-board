import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL environment variable is not set");
}

export default defineConfig({
	schema: "./db/schema",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: { url: databaseUrl },
});
