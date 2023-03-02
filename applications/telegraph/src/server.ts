import {roomRouter} from '@app/routes'
import {applyWSSHandler} from '@trpc/server/adapters/ws'
import WS from 'ws'

import type {RoomRouter} from '@app/routes'

const createServer = (port: number) => {
  const server = new WS.Server({
    port,
  })

  const handler = applyWSSHandler({
    router: roomRouter,
    wss: server,
  })

  return {handler, server}
}

export {createServer}
export type {RoomRouter}
export * from '@app/interfaces'
