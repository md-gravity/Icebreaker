import type {ServerResponse, IncomingMessage} from 'node:http'

const cors =
  (origin: string) =>
  (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    if (req.method === 'OPTIONS') {
      res.writeHead(200)
      return res.end()
    }

    next()
  }

export {cors}
