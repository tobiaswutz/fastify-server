import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserBody, LoginBody } from './users.schemas';
import { createUser, getUserByUsername } from './users.services';
import jwt from 'jsonwebtoken';
import { logger } from '../../utils/logger';
import { env } from '../../config/env';
import argon2 from 'argon2';

export async function createUserHandler(request: FastifyRequest<{ Body: CreateUserBody; }>, reply: FastifyReply) {
  const newUserData = request.body;
  try {
    const user = await createUser(newUserData);
    console.log(`user mit dem namen ${user.username} wurde erstellt`);
    reply.code(201).send(user);
  } catch (e) {
    logger.error(e, `error creating user`);
    return reply.code(400).send({
      message: 'could not create user',
    });
  }
}

export async function loginHandler(request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) {
  const { username, password } = request.body;
  const user = await getUserByUsername(username);
  if (!user) { return reply.code(400).send({ message: 'Invalid username or password', }); }
  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) { return reply.code(400).send({ message: 'Invalid username or password', }); }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days from now
    },
    env.JWT_SECRET
  );

  return { token };
}


