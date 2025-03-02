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
}