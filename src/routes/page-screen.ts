import { FastifyInstance } from "fastify";
import { getPageScreenContent, updatePageScreen } from '../service/pageScreenService';

export async function homeScreen(fastify: FastifyInstance){
    fastify.get('/homeScreen', async (req, reply)=>{
        const response = await getPageScreenContent();
       return reply.status(200).send(response);
    }
    )

    fastify.put('/homeScreen', async(req, reply)=>{

        const response = await updatePageScreen(req.body as object);
        return reply.send(response);
    } )
}