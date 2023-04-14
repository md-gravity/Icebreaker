import {PrismaClient} from '.prisma/client'

let prisma: PrismaClient

const getPrismaClient = (): PrismaClient => {
  prisma ||= new PrismaClient()

  return prisma
}

export {getPrismaClient}
export type * from '.prisma/client'
