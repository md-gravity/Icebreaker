'use client'
import {FormEvent} from 'react'

import {useArchivistClient} from '@app/store/archivist-client'

const CreateRoom = () => {
  const archivistClient = useArchivistClient()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    send()

    async function send() {
      await archivistClient.createRoom.mutate()
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Create Room</button>
    </form>
  )
}

export {CreateRoom}
