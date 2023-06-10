import { FastifyInstance } from 'fastify';
import { acceptPendingFriendshipJsonSchema, createPendingFriendshipJsonSchema } from './friendships.schemas';
import { acceptPendingFriendshipHandler, createPendingFriendshipHandler, getReceivedFriendshipRequestsHandler, getSentFriendshipRequestsHandler } from './friendships.controller';


export async function friendshipRoutes(app: FastifyInstance) {
  app.post('/ask', { schema: createPendingFriendshipJsonSchema }, createPendingFriendshipHandler);

  app.post('/accept', { schema: acceptPendingFriendshipJsonSchema }, acceptPendingFriendshipHandler);

  app.get('/requests', { }, getReceivedFriendshipRequestsHandler);

  app.get('/requests-sent', { }, getSentFriendshipRequestsHandler);
  

}

