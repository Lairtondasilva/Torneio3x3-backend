import Fastify from 'fastify';
import cors from '@fastify/cors'
import { homeScreen } from './routes/page-screen';
import { authRoutes } from './routes/auth';
import jwt from '@fastify/jwt'
import 'dotenv/config'
import { teamRoutes } from './routes/team';



async function bootstrap(){
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors,{
        origin: true,
        allowedHeaders: "*"
    })
    
    fastify.register(jwt,{
        secret: process.env.SECRET
    });
    fastify.register(homeScreen);
    fastify.register(authRoutes);
    fastify.register(teamRoutes);

    await fastify.listen({port: 3333, host: '0.0.0.0'});
}

bootstrap();