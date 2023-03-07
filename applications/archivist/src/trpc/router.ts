import {procedure, router} from '@app/trpc/trpc'

const archivistRouter = router({
  createRoom: procedure.mutation(async ({input, ctx}) => ({})),
})

type ArchivistRouter = typeof archivistRouter

export {archivistRouter}
export type {ArchivistRouter}
