import {
  pgTable,
  varchar,
  integer,
  boolean,
  uuid,
  timestamp
} from "drizzle-orm/pg-core";

export const users = pgTable("Users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const friendships = pgTable(
  "Friendships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId1: uuid("user_id1").references(() => users.id).notNull(),
    userId2: uuid("user_id2").references(() => users.id).notNull(),
  },
);

export const pendingFriendships = pgTable(
  "PendingFriendships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    senderId: uuid("sender_id").references(() => users.id).notNull(),
    receiverId: uuid("receiver_id").references(() => users.id).notNull(),
  },
);

export const tresors = pgTable(
  "Tresors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    secret: varchar("secret", { length: 10000 }).notNull(),
    filled: boolean("filled").notNull(),
    auto_unlock: boolean("auto_unlock").notNull(),
    locked_until: timestamp("locked_until").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
);

export const tresorPermissions = pgTable(
  "TresorPermissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    safeId: uuid("safe_id").references(() => tresors.id).notNull(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    is_owner: boolean("is_owner").notNull(),
    can_fill: boolean("can_fill").notNull(),
    can_see: boolean("can_see").notNull(),
    can_open: boolean("can_read").notNull(),
  },
);