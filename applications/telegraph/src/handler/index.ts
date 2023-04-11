import {createContext} from '@app/handler/context'
import {type RoomRouter, roomRouter} from '@app/handler/router'
import {applyWSSHandler} from '@trpc/server/adapters/ws'
import {type WebSocketServer} from 'ws'

const createHandler = (server: WebSocketServer) =>
  applyWSSHandler({
    createContext,
    router: roomRouter,
    wss: server,
  })

export {type RoomRouter, createHandler}
