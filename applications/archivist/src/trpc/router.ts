import {createRoomInput} from '@app/inputs/create-room.input'
import {router, tokenProcedure} from '@app/trpc/trpc'
import {getArchivistDbClient} from '@packages/archivist-db'
import {createRoomEventer, getNATSClient} from '@packages/eventer'
import {createHash} from 'node:crypto'

const archivistRouter = router({
  createRoom: tokenProcedure
    .input((body) => createRoomInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const {jwt} = ctx
      if (!jwt) {
        throw new Error('Unauthorized')
      }

      const hash = createHash('sha256')
      const payload = JSON.stringify({
        ...input,
        createdAt: new Date(),
        userId: jwt.userId,
      })
      hash.update(payload)
      const url = hash.digest('hex')

      const room = await getArchivistDbClient().room.create({
        data: {
          name: input?.name,
          url,
        },
      })

      await createRoomEventer(getNATSClient().client).publish(room)

      return room
    }),
})

type ArchivistRouter = typeof archivistRouter

export {archivistRouter}
export type {ArchivistRouter}
