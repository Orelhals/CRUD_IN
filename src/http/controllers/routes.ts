import { FastifyInstance } from 'fastify';
import { register } from './register';
import { createPost, getPost, updatePost, deletePost, getAllPosts, getPostsByUser } from './post-controller';
import { deleteUser, getUser, updateUser } from './user-controller';

export function appRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.get("/users/:id", getUser);
    app.put("/users/:id", updateUser);
    app.delete("/users/:id", deleteUser);

    app.post("/users/:usuarioId/posts", createPost); // Alterado para incluir o ID do usuário
    app.get("/posts/:id", getPost);
    app.put("/posts/:id", updatePost);
    app.delete("/posts/:id", deletePost);
    app.get("/posts", getAllPosts);
    app.get("/users/:usuarioId/posts", getPostsByUser); // Certifique-se de que esta rota está correta
}