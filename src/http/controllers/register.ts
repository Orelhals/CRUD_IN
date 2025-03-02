import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UsersAlreadyExists } from "@/use-cases/errors/users-already-exists";
import { RegisterUseCase } from "@/use-cases/register-use-cases";
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

    
    try {
      const prismaUsersRepository = new PrismaUsersRepository();
      const registerUseCase = new RegisterUseCase(prismaUsersRepository);
      await registerUseCase.execute(
        {nome, email, senha, foto}
      );
    } catch (err) {
      if (err instanceof UsersAlreadyExists) {
        return reply.status(400).send({ message: err.message });
      }
      throw err
    }
    return reply.status(201).send({ message: "User created" });
  }