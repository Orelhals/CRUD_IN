import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({onlyCookie: true});
  
      const token = await reply.jwtSign({}, {
        sign: {
          sub: request.user.sub
        }
      })

      const refreshtoken = await reply.jwtSign({}, {
        sign: {
          sub: request.user.sub,
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

}