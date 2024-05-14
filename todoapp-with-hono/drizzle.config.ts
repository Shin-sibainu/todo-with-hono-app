import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  schema: "./src/schema.ts",
  out: "./migrations",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "./wrangler.toml",
    dbName: "hono-drizzle",
  },
} satisfies Config;
