import {createUserEventer, connectEventer as connect} from '@packages/eventer'

const connectEventer = async () => {
  const client = await connect()

  createUserEventer(client).listen({
    ackWait: 5000,
    onMessage: async (data, msg) => {
      console.log(data)
      msg.ack()
    },
    queueGroupName: 'passport-service',
  })
}

export {connectEventer}
