import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().default(sql`(hex(randomblob(16)))`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const workshopRegistrations = sqliteTable("workshop_registrations", {
  id: text("id").primaryKey().default(sql`(hex(randomblob(16)))`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  profession: text("profession").notNull(),
  createdAt: integer("created_at", { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWorkshopRegistrationSchema = createInsertSchema(workshopRegistrations).pick({
  name: true,
  email: true,
  profession: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWorkshopRegistration = z.infer<typeof insertWorkshopRegistrationSchema>;
export type WorkshopRegistration = typeof workshopRegistrations.$inferSelect;
