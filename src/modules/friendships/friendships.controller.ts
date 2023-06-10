import { FastifyRequest, FastifyReply } from "fastify";
import { logger } from "../../utils/logger";
import { AcceptPendingFriendshipBody, CreatePendingFriendshipBody } from "./friendships.schemas";
import { acceptPendingFriendship, createPendingFriendship, getReceivedFriendshipRequests, getSentFriendshipRequests } from "./friendships.services";

export async function createPendingFriendshipHandler(request: FastifyRequest<{ Body: CreatePendingFriendshipBody; }>, reply: FastifyReply) {
  const { username } = request.body;
  const { user } = request;

  console.log('senderId', user.id);
  console.log('username', username);
  
  
  try {
    const friendship = await createPendingFriendship(user, username);
    reply.code(201).send();
  } catch (e) {
    logger.error(e, `error creating friendshipRequest`);
    return reply.code(400).send({
      message: 'could not create friendshipRequest',
    });
  }
}

export async function acceptPendingFriendshipHandler(request: FastifyRequest<{ Body: AcceptPendingFriendshipBody; }>, reply: FastifyReply) {
  const { pendingFriendshipId } = request.body;
  const { user } = request;

  console.log('pendingFriendshipId', pendingFriendshipId);
  console.log('user', user);

  try {
    const friendship = await acceptPendingFriendship(user.id, pendingFriendshipId);
    reply.code(201).send();
  } catch (e) {
    logger.error(e, `error accepting friendship`);
    return reply.code(400).send({
      message: 'could not accept friendship',
    });
  }
}

export async function getReceivedFriendshipRequestsHandler(request: FastifyRequest, reply: FastifyReply) {
  const { user } = request;

  console.log('user', user);

  try {
    const receivedFriendRequests = await getReceivedFriendshipRequests(user.id);
    reply.code(201).send(receivedFriendRequests);
  } catch (e) {
    logger.error(e, `error getting receivedFriendRequests`);
    return reply.code(400).send({
      message: 'could not get receivedFriendRequests',
    });
  }
}

export async function getSentFriendshipRequestsHandler(request: FastifyRequest, reply: FastifyReply) {
  const { user } = request;

  console.log('user', user);
  

  try {
    const sentFriendRequests = await getSentFriendshipRequests(user.id);
    reply.code(201).send(sentFriendRequests);
  } catch (e) {
    logger.error(e, `error getting sentFriendRequests`);
    return reply.code(400).send({
      message: 'could not get sentFriendRequests',
    });
  }
}