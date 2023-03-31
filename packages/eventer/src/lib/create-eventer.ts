import {parseMessage} from './parse-message'

import type {BaseEvent} from '../events/event'
import type {Stan, Message} from '../get-nats-client'

interface ListenerOptions<Data> {
  ackWait: number
  queueGroupName: string
  onMessage: (data: Data, msg: Message) => void
}

const createEventer = <Event extends BaseEvent>(type: Event['type']) =>
  function eventer(client: Stan) {
    return {
      listen: ({
        ackWait,
        queueGroupName,
        onMessage,
      }: ListenerOptions<Event['data']>) => {
        const subscription = client.subscribe(
          type,
          queueGroupName,
          createOptions()
        )
        subscription.on('message', (msg: Message) => {
          console.log(
            `💌 [${queueGroupName}] > Message received: "${type}" / ${queueGroupName}`
          )
          onMessage(parseMessage(msg), msg)
        })

        function createOptions() {
          return client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(ackWait)
            .setDurableName(queueGroupName)
        }
      },
      publish: (data: Event['data']) =>
        new Promise((resolve, reject) => {
          client.publish(type, JSON.stringify(data), (err, guid) => {
            if (err) {
              console.log(`❌ Message "${type} failed": ${err.message}`)
              return reject(err)
            }

            console.log(`📨 Message "${type}" sent`)
            resolve(guid)
          })
        }),
    }
  }

export {createEventer}
export type {ListenerOptions}
