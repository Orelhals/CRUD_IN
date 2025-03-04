import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserUseCase } from "@/use-cases/get-user-use-case";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserUseCase = new GetUserUseCase(prismaUsersRepository);
    
    const {user} = await getUserUseCase.execute({
        usuarioId : request.user.sub
    })

    return reply.status(200).send({
        usuario: {
            ...user,
            senha: undefined
        }
    });
}