import { fastify } from 'fastify';
import { DatabasePostgres } from './databasePostgres.js';

const server = fastify();
const database = new DatabasePostgres();
 
// Metodos http
// GET, POST, PUT, DELETE

// POST http://localhost:3333/videos 
// Cria um novo video
server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body;

    await database.create({
        title,
        description,
        duration,
    });

    console.log(database.list());

    return reply.status(201).send();
});

server.get('/videos', async (request) => {
    const search = request.query.search;
    
    console.log(search);

    const videos = await database.list();

    return videos; 
});

// Para atualizar apenas UM video
// Route Parameter Ex: ':id'
// Quando acessar essa rota precisa passar esse id
server.put('/videos/:id',async (request, reply) => {
    const videoId = request.params.id;
    const {title, description, duration} = request.body;

    await database.update(videoId, {
        title,
        description,
        duration,
    });

    return reply.status(204).send()
});

server.delete('/videos/:id',async (request, reply) => {
    const videoId = request.params.id;

    await database.delete(videoId);

    return reply.status(204).send()

});

server.listen({
    port: process.env.PORT ?? 3333,
});