import "dotenv/config";
import fastify from "fastify";
import { ZodError } from "zod";
import { appRoutes } from "./http/controllers/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "process";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";

export const app = fastify();

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET!, 
  cookie: {
    cookieName: "refreshtoken",
    signed: false,
  },
  sign: { 
    expiresIn: "10m" 
  }
});

app.register(fastifyCookie);

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: "Validation error", issues: error.format() });
  }
  return reply.status(500).send({ message: "Internal server error" });
})
