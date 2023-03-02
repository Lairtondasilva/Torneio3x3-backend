import '@fastify/jwt'
import { Roles } from '@prisma/client'

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: {
        name: string
        avatarURl: string
        sub:string
    }
}
}