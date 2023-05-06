import {Socket} from 'node:net'

interface ServerInterface {
  getConnectionsCount(): Promise<number>
  listen(port: number, cb?: () => void): void
  close(): void
  onConnection(cb: (socket: Socket) => void): void
  onClose(cb: () => void): void
  onListen(cb: () => void): void
}

export {type ServerInterface}
