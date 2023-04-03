import {createContext} from '@app/trpc/context'
import {roomRouter} from '@app/trpc/routes'
import {applyWSSHandler} from '@trpc/server/adapters/ws'

import type {RoomRouter} from '@app/trpc/routes'

import type {WebSocketServer} from 'ws'

const createHandler = (server: WebSocketServer) =>
  applyWSSHandler({
    createContext,
    router: roomRouter,
    wss: server,
  })

export {createHandler}
export type {RoomRouter}
