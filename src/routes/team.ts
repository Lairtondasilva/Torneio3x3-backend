import { FastifyInstance, FastifyRequest } from 'fastify';
import { create, findAll, findByUserId } from '../service/teamService';
import { authenticate } from '../plugins/authenticate';

export async function teamRoutes(fastify: FastifyInstance){
    
    fastify.post('/team/create',{
        onRequest: [authenticate]
    }, async (request, reply)=>{
       try{
        const team = await create(request.body as object);
        return reply.code(200).send(team);
       }catch(err){
        return reply.send(err);
       }
    })

    fastify.get("/teams/search/all",{
        onRequest: [authenticate]
    },async (request, reply)=>{
        try{
         const teams = await findAll();
         console.log(teams)
         return reply.code(200).send(teams);
        }catch(err){
         return reply.send(err);
        }
     })

     fastify.get<{
        Params: { userId: string };
      }>("/teams/search/:userId", {
        onRequest: [authenticate]
      }, async (request, reply) => {
        try {
          const { userId } = request.params;
          console.log("ENTROU AQUI ID:", userId)
          const team = await findByUserId(userId);
          console.log(team);
          return reply.code(200).send(team);
        } catch (err) {
          return reply.send(err);
        }
      })
      
}