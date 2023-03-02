import {createTemporalUserInput} from '@app/inputs/create-temporal-user.input'
import {getPassportDBClient} from '@packages/passport-db'
import {initTRPC} from '@trpc/server'
import crypto from 'node:crypto'

import type {Context} from '@app/lib/create-context'

const tRPC = initTRPC.context<Context>().create()
const {router, procedure} = tRPC

const passportRouter = router({
  createTemporalUser: procedure
    .input((body) => createTemporalUserInput.parse(body))
    .mutation(async ({input}) => {
      const hash = crypto
        .createHash('md5')
        .update(
          JSON.stringify({
            data: new Date(),
            name: input.username,
            temporal: true,
          })
        )
        .digest('hex')

      return getPassportDBClient().user.create({
        data: {
          email: hash,
          passwordHash: hash,
          temporal: true,
          username: input.username,
        },
      })
    }),
})

type PassportRouter = typeof passportRouter

export {passportRouter}
export type {PassportRouter}
