import {trpcHandler} from '@app/trpc/handler'
import http from 'node:http'

import type {ArchivistRouter} from '@app/trpc/handler'

const server = new http.Server((req, res) => {
  trpcHandler(req, res)
})

export {server}
export type {ArchivistRouter}
