import {createContext} from '@app/handler/context'
import {type ArchivistRouter, archivistRouter} from '@app/handler/router'
import {createHTTPHandler} from '@trpc/server/adapters/standalone'

const handler = createHTTPHandler({
  createContext,
  router: archivistRouter,
})

export {type ArchivistRouter, handler}
