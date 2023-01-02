import Fastify from 'fastify';
import cors from '@fastify/cors'
import { homeScreen } from './routes/page-screen';


async function bootstrap(){
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors,{
        origin: true
    })

    fastify.register(homeScreen);

    await fastify.listen({port: 3333, host: '0.0.0.0'});
}

bootstrap();