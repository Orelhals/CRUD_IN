import fastify from "fastify";
import { z } from "zod";
import { appRoutes } from "./http/controllers/routes";

export const app = fastify();

app.get("/home", (request, reply) => {
  return { message: "Hello world" };
})

app.register(appRoutes)
