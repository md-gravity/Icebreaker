import {PrismaClient} from '@prisma/client'

interface GetArchivistDbClient {
  prisma?: PrismaClient
  (): PrismaClient
}

const getArchivistDbClient: GetArchivistDbClient = () => {
  const prisma: PrismaClient = getArchivistDbClient.prisma || new PrismaClient()

  if (getArchivistDbClient.prisma) {
    getArchivistDbClient.prisma = prisma
  }

  return prisma
}

export {getArchivistDbClient}
export * from '@prisma/client'
