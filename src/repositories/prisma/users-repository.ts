import { Prisma, Usuario } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario | null>;
}