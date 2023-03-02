import {z} from 'zod'
import fetch from 'node-fetch';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify'; 
import jwt from '@fastify/jwt';

export async function googleSignInAndSignUp (req: object, fastify:FastifyInstance){
    try{
        const createUserBody = z.object({
            access_token: z.string()
        })
        const {access_token} = createUserBody.parse(req);
        const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo",{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        });

        const userData = await userResponse.json();

        const userBodySchema = z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            picture: z.string() || null || undefined
        })

        const userInfo = userBodySchema.parse(userData);

        const userInDataBase = await prisma.user.findUnique({
            where:{
                googleId: userInfo.id
            }
        })

        if(!userInDataBase){

            const user = await prisma.user.create({
                data:{
                    name: userInfo.name,
                    email: userInfo.email,
                    googleId: userInfo.id,
                    avatarUrl: userInfo.picture
            }});


            const token = fastify.jwt.sign({
                name: user.name,
                avatarUrl: user.avatarUrl,
                role: user.roles
            },{
                sub: user.id,
                expiresIn: "1 day"
            });

            return {token};
        }else{


            const token = fastify.jwt.sign({
                    name: userInDataBase.name,
                    avatarUrl: userInDataBase.avatarUrl,
                    roles: userInDataBase.roles
            },{
                sub: userInDataBase.id,
                expiresIn: "1 day"
            });

            return {token}
        }

    }
    catch(error){
        return {error:{
            message: error
        }}
    }
}

export async function chooseRoles(id: string , req: Object, fastify: FastifyInstance){
    try{
        const roleBody = z.object({
            role: z.string()
        })
        const roleInfo = roleBody.parse(req);
        
        const user = await prisma.user.update({
            where:{
                id: id
            },
            data:{
                roles: roleInfo.role
            }
        });
        if(user.roles === "Jogador"){
            await prisma.player.create({
                data:{
                    name: user.name,
                    userId: user.id,
                    points: 0,                    
                }
            })
        }

    const token = fastify.jwt.sign({
            name: user.name,
            avatarUrl: user.avatarUrl,
            roles: user.roles
    },{
        sub: user.id,
        expiresIn: "1 day"
    });

    return {token};
       
    }
    catch(e){
        throw new Error("Estamos com problemas no servidores tente novamente mais tarde!")
    }
}