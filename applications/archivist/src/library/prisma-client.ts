import {PrismaClient} from '.prisma/client'

let prisma: PrismaClient

const prismaClient = (): PrismaClient => {
  prisma ||= new PrismaClient()

  return prisma
}

export {prismaClient}
export type * from '.prisma/client'
