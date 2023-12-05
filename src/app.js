import fastify from 'fastify';
import env from '../config/env.js';

const app = fastify(
    {logger:true,}
);

app.get("/", function (request, reply) {
    reply.send({ hello: "world"});
})



app.listen({ port: env.PORT, host: '0.0.0.0' }, function (error, address) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    console.log(`Servidor rodando na porta ${env.PORT}`);
});