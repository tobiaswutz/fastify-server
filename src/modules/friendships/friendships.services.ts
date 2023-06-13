import { eq, and, or } from "drizzle-orm";
import { db } from "../../db";
import { friendships, pendingFriendships, users } from "../../db/schema";
import { real } from "drizzle-orm/pg-core";

export async function createPendingFriendship(user: { id: string, username: string}, username: string): Promise<any> {
  const present = await db.select().from(pendingFriendships).where(and(eq(pendingFriendships.senderId, user.id), eq(pendingFriendships.receiverUsername, username)));
  if (present.length > 0) { throw new Error('pending friendship already exists'); }

  const receiver = await db.select().from(users).where(eq(users.username, username));

  const result = await db
    .insert(pendingFriendships)
    .values({ senderId: user.id, receiverId: receiver[0].id, senderUsername: user.username ,receiverUsername: username}).returning({
      id: pendingFriendships.id,
      senderId: pendingFriendships.senderId,
      receiverId: pendingFriendships.receiverId,
      receiverUsername: pendingFriendships.receiverUsername,
    });

  return result[0];
}

export async function acceptPendingFriendship(userId: string, pendingfId: string): Promise<any> {
  const pendingFriendship = await db.select().from(pendingFriendships).where(eq(pendingFriendships.id, pendingfId));
  if (!pendingFriendship) { throw new Error('pending friendship not found'); }
  await db.delete(pendingFriendships).where(eq(pendingFriendships.id, pendingfId));

  if (userId === pendingFriendship[0].receiverId) {
    await db.insert(friendships).values({ userId1: pendingFriendship[0].senderId, userId2: pendingFriendship[0].receiverId });
  } else {
    throw new Error('user is not receiver');
  }
}

export async function getReceivedFriendshipRequests(userId: string): Promise<any> {
  const result = await db.select().from(pendingFriendships).where(eq(pendingFriendships.receiverId, userId));
  return result;
}

export async function getSentFriendshipRequests(userId: string): Promise<any> {
  const result = await db.select().from(pendingFriendships).where(eq(pendingFriendships.senderId, userId));
  return result;
}

export async function getFriends(userId: string): Promise<any> {
  const result = await db.select().from(friendships).where(or(eq(friendships.userId1, userId), eq(friendships.userId2, userId)));

  result.filter((friendship) => {
    if (friendship.userId1 === userId) {
      return friendship.userId2;
    } else {
      return friendship.userId1;
    }
  });

  const realFriends = await db.select().from(users).where(or(eq(users.id, result[0].userId1), eq(users.id, result[0].userId2)));

  realFriends.forEach((friend) => {
    friend.password = 'secret';
  });

  
  return realFriends;
}