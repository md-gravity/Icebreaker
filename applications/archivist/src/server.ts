import {trpcHandler} from '@app/trpc/handler'
import http from 'node:http'

import type {ArchivistRouter} from '@app/trpc/handler'

const server = new http.Server((req, res) => {
  cors(res)
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }

  trpcHandler(req, res)
})

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  res.setHeader('Access-Control-Allow-Headers', '*')
}

export {server}
export type {ArchivistRouter}
