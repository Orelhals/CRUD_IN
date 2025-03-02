import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prismaPostsRepository = new PrismaPostsRepository();

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
    const createPostBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
    });

    const createPostParamsSchema = z.object({
        usuarioId: z.string().uuid(),
    });

    const { titulo, conteudo } = createPostBodySchema.parse(request.body);
    const { usuarioId } = createPostParamsSchema.parse(request.params);

    const post = await prismaPostsRepository.create({
        titulo,
        conteudo,
        usuario: { connect: { id: usuarioId } }
    });

    return reply.status(201).send(post);
}

export async function getPost(request: FastifyRequest, reply: FastifyReply) {
    const getPostParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = getPostParamsSchema.parse(request.params);

    const post = await prismaPostsRepository.findById(id);

    if (!post) {
        return reply.status(404).send("Post not found");
    }

    return reply.status(200).send(post);
}

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
    const updatePostParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const updatePostBodySchema = z.object({
        titulo: z.string().optional(),
        conteudo: z.string().optional(),
    });

    const { id } = updatePostParamsSchema.parse(request.params);
    const data = updatePostBodySchema.parse(request.body);

    const post = await prismaPostsRepository.update(id, data);

    return reply.status(200).send(post);
}

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const deletePostParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = deletePostParamsSchema.parse(request.params);

    await prismaPostsRepository.delete(id);

    return reply.status(204).send();
}

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    const posts = await prismaPostsRepository.findAll();
    return reply.status(200).send(posts);
}

export async function getPostsByUser(request: FastifyRequest, reply: FastifyReply) {
    const getPostsByUserParamsSchema = z.object({
        usuarioId: z.string().uuid(),
    });

    const { usuarioId } = getPostsByUserParamsSchema.parse(request.params);

    const posts = await prismaPostsRepository.findByUserId(usuarioId);

    return reply.status(200).send(posts);
}