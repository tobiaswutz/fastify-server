import { FastifyRequest, FastifyReply } from "fastify";
import { logger } from "../../utils/logger";
import { CreatePendingFriendshipBody } from "./friendships.schemas";
import { createPendingFriendship } from "./friendships.services";

export async function createPendingFriendshipHandler(request: FastifyRequest<{ Body: CreatePendingFriendshipBody; }>, reply: FastifyReply) {
  const { username } = request.body;
  const { user } = request;

  console.log('senderId', user.id);
  console.log('username', username);
  
  
  try {
    const friendship = await createPendingFriendship(user.id, username);
    reply.code(201).send(friendship);
  } catch (e) {
    logger.error(e, `error creating friendship`);
    return reply.code(400).send({
      message: 'could not create friendship',
    });
  }
}