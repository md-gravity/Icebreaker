import {PrismaClient} from '.prisma/client'

interface GetArchivistDbClient {
  prisma?: PrismaClient
  (): PrismaClient
}

const getTelegraphDbClient: GetArchivistDbClient = () => {
  const prisma: PrismaClient = getTelegraphDbClient.prisma || new PrismaClient()

  if (!getTelegraphDbClient.prisma) {
    getTelegraphDbClient.prisma = prisma
  }

  return prisma
}

export {getTelegraphDbClient}
export * from '.prisma/client'
