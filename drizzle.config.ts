import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.NODE_ENV === 'production' ? "/tmp/kishanbrand.db" : "kishanbrand.db",
  },
});
