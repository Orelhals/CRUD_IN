import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const AuthenticateBodySchema = z.object({
      email: z.string().email(),
      senha: z.string().min(6),
    });
  
    const {email, senha} = AuthenticateBodySchema.parse(request.body);

    
    try {
      const prismaUsersRepository = new PrismaUsersRepository();
      const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);
      const {user} = await authenticateUseCase.execute(
        { email, senha}
      );
      const token = await reply.jwtSign({}, {
        sign: {
          sub: user.id
        }
      })

      const refreshtoken = await reply.jwtSign({}, {
        sign: {
          sub: user.id,
          expiresIn: '7d'
        },
      })

    return reply
      .status(200)
      .setCookie('refreshtoken', refreshtoken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({token});

    } catch (err) {
        return reply.status(401).send()
    }
  }