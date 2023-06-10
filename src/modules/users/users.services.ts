import { InferModel, and, eq } from "drizzle-orm";
import argon2 from "argon2";
import { users } from "../../db/schema";
import { db } from "../../db";
import { PgJsonBuilder } from "drizzle-orm/pg-core";

export async function createUser(data: InferModel<typeof users, "insert">) {
  const hashedPassword = await argon2.hash(data.password);

  const result = await db
    .insert(users)
    .values({ ...data, password: hashedPassword,})
    .returning({
      id: users.id,
      username: users.username,
    });

  return result[0];
}


export async function getUserByUsername(username: string) {
  const result = await db.select().from(users).where(eq(users.username, username));
  return result[0];
}
