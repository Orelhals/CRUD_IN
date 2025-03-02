import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "./users-repository";

export class PrismaUsersRepository implements UsersRepository{
    //Essa função busca um usuário no banco de dados pelo email
    async findByEmail(email: string) {
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });
        return usuario;
    }
    //Essa função cria um usuário no banco de dados
    async create(data: Prisma.UsuarioCreateInput) {
        const usuario = await prisma.usuario.create({
            data
          });
          return usuario;
    }

    async findById(id: string) {
        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });
        return usuario;
    }

    async update(id: string, data: Prisma.UsuarioUpdateInput) {
        const usuario = await prisma.usuario.update({
            where: { id },
            data
        });
        return usuario;
    }

    async delete(id: string) {
        await prisma.usuario.delete({
            where: { id }
        });
    }
}