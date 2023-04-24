'use client'
import {useRouter} from 'next/navigation'
import {type FormEvent} from 'react'

import {useCreateRoom} from '@app/room/hooks/create-room'

interface FormControlsCollection extends HTMLFormControlsCollection {
  roomName: HTMLInputElement
}
interface HTMLRoomForm extends HTMLFormElement {
  readonly elements: FormControlsCollection
}

function RoomForm() {
  const router = useRouter()
  const createRoom = useCreateRoom({
    onSuccess: (room) => {
      router.push(`/room/${room.url}`)
    },
  })
  const handleSubmit = (event: FormEvent<HTMLRoomForm>) => {
    event.preventDefault()

    createRoom.mutate({name: event.currentTarget.roomName.value})
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Room</legend>
        <label htmlFor="roomName">Name(optional):</label>
        <input
          id="roomName"
          name="roomName"
          type="text"
        />
      </fieldset>
      <br />
      <br />
      <button type="submit">Create</button>
    </form>
  )
}

export {RoomForm}
