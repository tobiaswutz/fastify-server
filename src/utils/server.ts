import fastify from "fastify";
import guard from "fastify-guard";
import cors from "@fastify/cors";
import { usersRoutes } from "../modules/users/users.routes";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { friendships } from "../db/schema";
import { friendshipRoutes } from "../modules/friendships/friendships.routes";

type User = {
  id: string;
  username: string;
};

declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}

export async function buildServer() {
  const app = fastify({ logger: true });
  app.decorateRequest("user", null);
  app.addHook("onRequest", async function (request, reply) {

    const listOfPublicRoutes = ["/api/users/register", "/api/users/login"];

    const authHeader = request.headers.authorization;
    console.log("request.url", request.url);
    if (listOfPublicRoutes.includes(request.url)) { return; }
    if (!authHeader) { return reply.code(401).send({ message: "missing token" }); }
    try {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, env.JWT_SECRET) as User;
      console.log("user", decoded);
      request.user = decoded;
    } catch (e) {
      console.log(e);
      reply.code(401).send({ message: "invalid token" });
    }
  });

  app.register(guard, {
    requestProperty: "user",
    scopeProperty: "scopes",
    errorHandler: (result, request, reply) => { return reply.send("you can not do that"); },
  });
  await app.register(cors, {
    origin: "*",
  });

  app.get("/", async function (request, reply) {
    return { hello: "world" };
  });


  app.register(usersRoutes, { prefix: "/api/users" });
  app.register(friendshipRoutes, { prefix: "/api/friendships" })


  return app;
}
