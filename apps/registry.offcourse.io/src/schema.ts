import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const auth = sqliteTable("auth", {
  login: text("login").notNull(),
  provider: text("provider").notNull().unique(),
  userName: text("userName").notNull().references(() => curator.userName)
});

export const curator = sqliteTable("curators", {
  userName: text("userName").primaryKey(),
  repository: text("repository").notNull().unique(),
});

