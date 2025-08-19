import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  subscriptionStatus: text("subscription_status").default("free"),
  subscriptionExpiry: timestamp("subscription_expiry"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "3d-animation", "realistic", "cartoon", "motion-graphics"
  quality: text("quality").default("4k"), // "hd", "4k"
  duration: integer("duration").notNull(), // in seconds
  voiceSettings: jsonb("voice_settings"), // voice type, speed, emotion
  musicSettings: jsonb("music_settings"), // genre, mood
  status: text("status").default("processing"), // "processing", "completed", "failed"
  videoUrl: text("video_url"),
  thumbnailUrl: text("thumbnail_url"),
  processingTime: integer("processing_time"), // in seconds
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(), // in paise (₹149 = 14900 paise)
  currency: text("currency").default("INR"),
  status: text("status").notNull(), // "pending", "completed", "failed"
  paymentMethod: text("payment_method"), // "card", "upi", "netbanking"
  transactionId: text("transaction_id"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  status: true,
  videoUrl: true,
  thumbnailUrl: true,
  processingTime: true,
  createdAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
