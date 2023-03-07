import {procedure, router} from '@app/trpc/trpc'

const archivistRouter = router({
  createRoom: procedure.mutation(async ({input, ctx}) => ({})),
})

type PassportRouter = typeof archivistRouter

export {archivistRouter}
export type {PassportRouter}
