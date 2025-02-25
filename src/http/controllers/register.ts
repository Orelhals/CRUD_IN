import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      nome: z.string(),
      email: z.string().email(),
      senha: z.string().min(6),
      foto: z.string().url(),
    });
  
    const {nome, email, senha, foto} = registerBodySchema.parse(request.body);
  
    await prisma.usuario.create({
      data: { nome, email, senha, foto }
    });
  
    return reply.status(201).send({ message: "User created" });
  }