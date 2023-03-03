import {createContext} from '@app/trpc/context'
import {passportRouter} from '@app/trpc/router'
import {createHTTPHandler} from '@trpc/server/adapters/standalone'

import type {PassportRouter} from '@app/trpc/router'

const trpcHandler = createHTTPHandler({
  createContext,
  router: passportRouter,
})

export {trpcHandler}
export type {PassportRouter}
