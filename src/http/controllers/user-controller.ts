import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prismaUsersRepository = new PrismaUsersRepository();

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
    const getUserParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = getUserParamsSchema.parse(request.params);

    const user = await prismaUsersRepository.findById(id);

    if (!user) {
        return reply.status(404).send("User not found");
    }

    return reply.status(200).send(user);
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const updateUserParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const updateUserBodySchema = z.object({
        nome: z.string().optional(),
        email: z.string().email().optional(),
        senha: z.string().min(6).optional(),
        foto: z.string().url().optional(),
    });

    const { id } = updateUserParamsSchema.parse(request.params);
    const data = updateUserBodySchema.parse(request.body);

    if (data.senha) {
        data.senha = await hash(data.senha, 6);
    }

    const user = await prismaUsersRepository.update(id, data);

    return reply.status(200).send(user);
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const deleteUserParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = deleteUserParamsSchema.parse(request.params);

    try {
        await prismaUsersRepository.delete(id);
        return reply.status(204).send();
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}