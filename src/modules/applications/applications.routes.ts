import { FastifyInstance } from "fastify";
import { createApplicationHandler, getApplicationshandler, test } from "./applications.controllers";
import { createApplicationJsonSchema } from "./applications.schemas";

export async function applicationRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: createApplicationJsonSchema,
    },
    createApplicationHandler
  );

  app.get("/", getApplicationshandler);

  app.get("/test/:id", test);
}
