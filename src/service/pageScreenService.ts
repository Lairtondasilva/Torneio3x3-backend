import { prisma } from "../lib/prisma";
import {z} from 'zod';

export const getPageScreenContent = async ()=>{
    try{
        const content = await prisma.pageScreen.findFirstOrThrow();
        return content;
    }
    catch(e){
        console.log(e);
    }
}

export const updatePageScreen = async (req: Object)=>{
    try{
        const body = z.object({
            id: z.string(),
            title: z.string(),
            enrollmentDate: z.string()
        });

       const content = body.parse(req);
       const response = await prisma.pageScreen.update({
            where: {
                id: content.id
            }, data:{
                ...content
            }
        })
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}