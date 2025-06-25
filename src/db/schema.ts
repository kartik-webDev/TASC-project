import { relations, sql } from "drizzle-orm";
import { type AdapterAccount } from "next-auth/adapters";
import {
  pgTable,
  varchar,
  text,
  timestamp,
  json,
  boolean,
  serial, index, primaryKey,
} from 'drizzle-orm/pg-core'



export const feedbacks = pgTable('feedbacks', {
  id: serial('id').primaryKey(),
  vehicleNumber: text('vehicle_number').notNull(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id, {
    onDelete: 'set null', // or 'cascade' depending on your use case
  }),

  // Feedback data...
  safetyPositive: json('safety_positive').$type<string[]>().default([]),
  safetyNegative: json('safety_negative').$type<string[]>().default([]),
  vehiclePositive: json('vehicle_positive').$type<string[]>().default([]),
  vehicleNegative: json('vehicle_negative').$type<string[]>().default([]),
  behaviorPositive: json('behavior_positive').$type<string[]>().default([]),
  behaviorNegative: json('behavior_negative').$type<string[]>().default([]),
  comfortPositive: json('comfort_positive').$type<string[]>().default([]),
  comfortNegative: json('comfort_negative').$type<string[]>().default([]),
  servicePositive: json('service_positive').$type<string[]>().default([]),
  serviceNegative: json('service_negative').$type<string[]>().default([]),
  additionalComments: text('additional_comments'),
  photoUrl: text('photo_url'),
  hasPhoto: boolean('has_photo').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  latitude: text('latitude'),
  longitude: text('longitude'),
  location: text('location'),
});

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  user: one(users, {
    fields: [feedbacks.userId],
    references: [users.id],
  }),
}));


export const users = pgTable("user", (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.varchar({ length: 255 }),
  email: d.varchar({ length: 255 }).notNull(),
  emailVerified: d
    .timestamp({
      mode: "date",
      withTimezone: true,
    })
    .default(sql`CURRENT_TIMESTAMP`),
  image: d.varchar({ length: 255 }),
}));




export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = pgTable(
  "account",
  (d) => ({
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    type: d.varchar({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: d.varchar({ length: 255 }).notNull(),
    providerAccountId: d.varchar({ length: 255 }).notNull(),
    refresh_token: d.text(),
    access_token: d.text(),
    expires_at: d.integer(),
    token_type: d.varchar({ length: 255 }),
    scope: d.varchar({ length: 255 }),
    id_token: d.text(),
    session_state: d.varchar({ length: 255 }),
  }),
  (t) => [
    primaryKey({ columns: [t.provider, t.providerAccountId] }),
    index("account_user_id_idx").on(t.userId),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  (d) => ({
    sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [index("t_user_id_idx").on(t.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verification_token",
  (d) => ({
    identifier: d.varchar({ length: 255 }).notNull(),
    token: d.varchar({ length: 255 }).notNull(),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);


export type Feedback = typeof feedbacks.$inferSelect;
export type NewFeedback = typeof feedbacks.$inferInsert;