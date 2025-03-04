import { FastifyInstance } from 'fastify';
import { register } from './register';
import { createPost, getPost, updatePost, deletePost, getAllPosts, getPostsByUser } from './post-controller';
import { deleteUser, getUser, updateUser } from './user-controller';
import { authenticate } from './authenticate';
import { verifyJWT } from './middlewares/verify-jwt';
import { profile } from './profile';
import { refresh } from './refresh';

export function appRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/authenticate", authenticate);
    app.get("/users/:id", getUser);
    app.put("/users/:id", updateUser);
    app.delete("/users/:id", deleteUser);

    app.post("/users/:usuarioId/posts", createPost); // Alterado para incluir o ID do usuário
    app.get("/posts/:id", getPost);
    app.put("/posts/:id", updatePost);
    app.delete("/posts/:id", deletePost);
    app.get("/posts", getAllPosts);
    app.get("/users/:usuarioId/posts", getPostsByUser); // Certifique-se de que esta rota está correta

    // Rota do refresh token
    app.patch("/token/refresh", refresh);
    // Authenticated routes
    app.get("/profile",{onRequest: [verifyJWT]}, profile)
}