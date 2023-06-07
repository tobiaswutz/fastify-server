import fastify from "fastify";
import guard from "fastify-guard";
import cors from "@fastify/cors";
import { logger } from "./logger";
import { applicationRoutes } from "../modules/applications/applications.routes";
import { usersRoutes } from "../modules/users/users.routes";
import { roleRoutes } from "../modules/roles/role.routes";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

type User = {
  id: string;
  applicationId: string;
  scopes: Array<string>;
};

declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}

export async function buildServer() {
  const app = fastify({ logger });
  app.decorateRequest("user", null);
  app.addHook("onRequest", async function (request, reply) {

    const listOfPublicRoutes = ["/api/users/login", "/api/open"];

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
  app.register(applicationRoutes, { prefix: "/api/applications" });
  app.register(usersRoutes, { prefix: "/api/users" });
  app.register(roleRoutes, { prefix: "/api/roles" });
  return app;
}
