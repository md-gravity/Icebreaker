import {handler} from '@app/handler'
import http from 'node:http'

const server = new http.Server((req, res) => {
  handler(req, res)
})

export {server}
