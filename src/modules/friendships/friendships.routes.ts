import { FastifyInstance } from 'fastify';
import { createPendingFriendshipJsonSchema } from './friendships.schemas';
import { createPendingFriendshipHandler } from './friendships.controller';


export async function friendshipRoutes(app: FastifyInstance) {
  app.post('/ask', { schema: createPendingFriendshipJsonSchema }, createPendingFriendshipHandler);

}

