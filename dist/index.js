// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
var users = sqliteTable("users", {
  id: text("id").primaryKey().default(sql`(hex(randomblob(16)))`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var workshopRegistrations = sqliteTable("workshop_registrations", {
  id: text("id").primaryKey().default(sql`(hex(randomblob(16)))`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  profession: text("profession").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`)
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertWorkshopRegistrationSchema = createInsertSchema(workshopRegistrations).pick({
  name: true,
  email: true,
  profession: true
});

// server/database.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
dotenv.config();
var sqlite = new Database("kishanbrand.db");
var db = drizzle(sqlite);
async function getAllRegistrations() {
  try {
    const result = await db.select().from(workshopRegistrations).orderBy(workshopRegistrations.createdAt);
    return result;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
}
async function createRegistration(data) {
  try {
    const result = await db.insert(workshopRegistrations).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("Error creating registration:", error);
    throw error;
  }
}
async function getRegistrationByEmail(email) {
  try {
    const result = await db.select().from(workshopRegistrations).where(eq(workshopRegistrations.email, email));
    return result[0];
  } catch (error) {
    console.error("Error fetching registration by email:", error);
    return void 0;
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/workshop/register", async (req, res) => {
    try {
      const { name, email, profession } = insertWorkshopRegistrationSchema.parse(req.body);
      const existing = await getRegistrationByEmail(email);
      if (existing) {
        return res.status(400).json({
          error: "Email already registered for workshop"
        });
      }
      const registration = await createRegistration({
        name,
        email,
        profession
      });
      console.log(`New workshop registration: ${name} (${email}) - ${profession}`);
      res.json({
        success: true,
        message: "Congratulations! You've successfully secured your spot in the workshop! We'll send you all the details soon."
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({
        error: "Invalid registration data"
      });
    }
  });
  app2.get("/api/admin/registrations", async (req, res) => {
    try {
      const registrations = await getAllRegistrations();
      res.json({ success: true, data: registrations });
    } catch (error) {
      console.error("Error fetching registrations:", error);
      res.status(500).json({ error: "Failed to fetch registrations" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5001", 10);
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
