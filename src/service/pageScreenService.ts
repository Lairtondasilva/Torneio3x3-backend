import PageScreenDTO from '../dto/pageScreenDto';
import { prisma } from "../lib/prisma";

export const getPageScreenContent = async ()=>{
    try{
        const content = await prisma.pageScreen.findFirstOrThrow();
        return content;
    }
    catch(e){
        console.log(e);
    }
}

export const updatePageScreen = async (content: PageScreenDTO)=>{
    try{
       const response = await prisma.pageScreen.update({
            where: {
                id: content.id
            }, data:{
                ...content
            }
        })
        return response;
    }catch(e){
        
    }
}