import {createContext} from '@app/lib/create-context'
import {passportRouter} from '@app/routes'
import {createHTTPHandler} from '@trpc/server/adapters/standalone'
import http from 'node:http'

import type {PassportRouter} from '@app/routes'

const handler = createHTTPHandler({
  createContext,
  router: passportRouter,
})

const server = new http.Server((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }

  handler(req, res)
})

export {server}
export type {PassportRouter}
