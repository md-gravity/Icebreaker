import {createContext} from '@app/trpc/context'
import {archivistRouter} from '@app/trpc/router'
import {createHTTPHandler} from '@trpc/server/adapters/standalone'

import type {ArchivistRouter} from '@app/trpc/router'

const trpcHandler = createHTTPHandler({
  createContext,
  router: archivistRouter,
})

export {trpcHandler}
export type {ArchivistRouter}
