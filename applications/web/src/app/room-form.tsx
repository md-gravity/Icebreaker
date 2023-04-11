'use client'
import {useRouter} from 'next/navigation'
import {type FormEvent} from 'react'

import {useCreateRoom} from '@app/services/create-room'

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
  const onSubmit = (event: FormEvent<HTMLRoomForm>) => {
    event.preventDefault()

    createRoom.mutate({name: event.currentTarget.roomName.value})
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Room(optional):</legend>
        <input
          name="roomName"
          type="text"
        />
        <br />
        <br />
        <button type="submit">Create</button>
      </fieldset>
    </form>
  )
}

export {RoomForm}
