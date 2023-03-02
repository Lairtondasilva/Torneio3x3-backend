import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function create (req: object){
    console.log(`*****************************************${req.toString()}******************************************************`)
        const teamBody = z.object({
            logo: z.string(),
            teamName: z.string(),
            descricao: z.string(),
            ownerId: z.string()
        })

        const teamInfo = teamBody.parse(req);
        console.log(`*****************************************${teamInfo}******************************************************`)
        const existingTeams = await prisma.team.findMany({
            where:{
                userId: teamInfo.ownerId
            }
        });
        if(existingTeams.length>0){
          const isNewTeam =  existingTeams.some(team=> team.status !== "Finalizado")
          console.log(isNewTeam)
          if(isNewTeam) throw {status: 400, message: "Você já tem um time cadastrado á espera de um torneio"}
        }
        const team = await prisma.team.create({
            data: {
                name: teamInfo.teamName,
                logo: teamInfo.logo,
                description: teamInfo.descricao,
                status: "Novo",
                userId: teamInfo.ownerId
            }
        });
        
        if(!team.id) throw {status: 400, message: "Não foi possível criar o seu time tente novamente"}

        return team;
}

export async function findAll(){
    const teams = await prisma.team.findMany();
    return teams;
}

export async function findByUserId(id: string){
    const team = await prisma.team.findFirst({where:{
        userId: id
    }});
    return team;
}