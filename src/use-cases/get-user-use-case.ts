import { UsersRepository } from "@/repositories/prisma/users-repository";
import { Usuario } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserUseCaseRequest {
    usuarioId: string;
}

interface GetUserUseCaseResponse {
    user: Usuario;
}
// Essa classe é responsável por criar um novo usuário
export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

    async execute({usuarioId}: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.findById(usuarioId);

        if (!user) {
            throw new ResourceNotFoundError();
        }
        return {user};
    }
}