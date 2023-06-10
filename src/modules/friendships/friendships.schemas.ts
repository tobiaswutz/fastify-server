import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const createPendingFriendshipBodySchema = z.object({ username: z.string(), });
export type CreatePendingFriendshipBody = z.infer<typeof createPendingFriendshipBodySchema>;
export const createPendingFriendshipJsonSchema = { body: zodToJsonSchema(createPendingFriendshipBodySchema, 'createPendingFriendshipBodySchema'), };

const acceptPendingFriendshipBodySchema = z.object({ senderId: z.string(), });
export type AcceptPendingFriendshipBody = z.infer<typeof acceptPendingFriendshipBodySchema>;
export const acceptPendingFriendshipJsonSchema = { body: zodToJsonSchema(acceptPendingFriendshipBodySchema, 'acceptPendingFriendshipBodySchema'), };

const rejectPendingFriendshipBodySchema = z.object({ senderId: z.string(), });
export type RejectPendingFriendshipBody = z.infer<typeof rejectPendingFriendshipBodySchema>;
export const rejectPendingFriendshipJsonSchema = { body: zodToJsonSchema(rejectPendingFriendshipBodySchema, 'rejectPendingFriendshipBodySchema'), };

const deleteFriendshipBodySchema = z.object({ friendId: z.string(), });
export type DeleteFriendshipBody = z.infer<typeof deleteFriendshipBodySchema>;
export const deleteFriendshipJsonSchema = { body: zodToJsonSchema(deleteFriendshipBodySchema, 'deleteFriendshipBodySchema'), };