import {type Message} from '../get-nats-client'

function parseMessage(msg: Message) {
  const data = msg.getData()

  if (typeof data === 'string') {
    return JSON.parse(data)
  }

  if (Buffer.isBuffer(data)) {
    return data.toString('utf-8')
  }
}

export {parseMessage}
