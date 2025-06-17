// import {
//   pgTable,
//   text,
//   timestamp,
//   primaryKey,
//   varchar,
// } from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: varchar("id", { length: 255 }).primaryKey(),
//   name: text("name"),
//   email: text("email").unique(),
//   emailVerified: timestamp("emailVerified", { mode: "date" }),
//   image: text("image"),
// });

// export const accounts = pgTable("accounts", {
//   userId: varchar("userId", { length: 255 }),
//   type: text("type").notNull(),
//   provider: text("provider").notNull(),
//   providerAccountId: text("providerAccountId").notNull(),
//   refresh_token: text("refresh_token"),
//   access_token: text("access_token"),
//   expires_at: timestamp("expires_at", { mode: "date" }),
//   token_type: text("token_type"),
//   scope: text("scope"),
//   id_token: text("id_token"),
//   session_state: text("session_state"),
// }, (table) => ({
//   pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
// }));

// export const sessions = pgTable("sessions", {
//   sessionToken: text("sessionToken").primaryKey(),
//   userId: varchar("userId", { length: 255 }).notNull(),
//   expires: timestamp("expires", { mode: "date" }).notNull(),
// });

// export const verificationTokens = pgTable("verification_tokens", {
//   identifier: text("identifier").notNull(),
//   token: text("token").notNull(),
//   expires: timestamp("expires", { mode: "date" }).notNull(),
// }, (table) => ({
//   pk: primaryKey({ columns: [table.identifier, table.token] }),
// }));
