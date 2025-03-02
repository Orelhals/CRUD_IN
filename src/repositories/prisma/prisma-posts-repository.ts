import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaPostsRepository {
    async create(data: Prisma.PostCreateInput) {
        const post = await prisma.post.create({
            data
        });
        return post;
    }

    async findById(id: string) {
        const post = await prisma.post.findUnique({
            where: { id }
        });
        return post;
    }

    async update(id: string, data: Prisma.PostUpdateInput) {
        const post = await prisma.post.update({
            where: { id },
            data
        });
        return post;
    }

    async delete(id: string) {
        await prisma.post.delete({
            where: { id }
        });
    }

    async findAll() {
        const posts = await prisma.post.findMany();
        return posts;
    }

    async findByUserId(usuarioId: string) {
        const posts = await prisma.post.findMany({
            where: { usuarioId }
        });
        return posts;
    }
}