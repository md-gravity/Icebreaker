import {PrismaClient} from '.prisma/client'

interface GetPassportDBClient {
  prisma?: PrismaClient
  (): PrismaClient
}

const getPassportDBClient: GetPassportDBClient = () => {
  const prisma: PrismaClient = getPassportDBClient.prisma || new PrismaClient()

  if (getPassportDBClient.prisma) {
    getPassportDBClient.prisma = prisma
  }

  return prisma
}

export {getPassportDBClient}
export * from '.prisma/client'
