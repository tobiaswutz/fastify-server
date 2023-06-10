import { eq } from "drizzle-orm";
import { db } from "../../db";
import { pendingFriendships, users } from "../../db/schema";

export async function createPendingFriendship(senderId: string, username: string): Promise<any> {
  const receiver = await db.select().from(users).where(eq(users.username, username));
  if (!receiver) { throw new Error('user not found'); }

  const result = await db
    .insert(pendingFriendships)
    .values({ senderId: senderId, receiverId: receiver[0].id }).returning({
      id: pendingFriendships.id,
      senderId: pendingFriendships.senderId,
      receiverId: pendingFriendships.receiverId,
    });

  return result[0];
}