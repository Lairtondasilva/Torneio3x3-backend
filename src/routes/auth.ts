import { FastifyInstance } from 'fastify';
import { googleSignInAndSignUp, chooseRoles } from '../service/authService';
import { authenticate } from '../plugins/authenticate';


export async function authRoutes( fastify: FastifyInstance){

    fastify.post('/users', async (request, reply)=>{
        const userInfo = await googleSignInAndSignUp(request.body as object, fastify);

        return reply.code(200).send(userInfo);
    })

    fastify.get('/users/me', {
        onRequest: [authenticate]
    },async (request,reply)=>{
        return reply.code(200).send({user: request.user});
    })

    fastify.put("/users/role",{
        onRequest: [authenticate]
    }, async(req, reply)=>{

        const tokenResponse = await chooseRoles(req.user.sub, req.body as Object, fastify);
        return reply.code(200).send(tokenResponse);
        
    })
}