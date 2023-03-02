'use client'
import {FormEvent, useState} from 'react'

import {passportClient} from '@app/lib/clients'
function Username() {
  const [username, setUsername] = useState('')

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const onSend = (event: FormEvent) => {
    event.preventDefault()
    send()

    async function send() {
      await passportClient.createTemporalUser.mutate({username})
    }
  }

  return (
    <form>
      <fieldset>
        <legend>Username:</legend>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <br />
        <button
          type="submit"
          onClick={onSend}
        >
          Send
        </button>
      </fieldset>
    </form>
  )
}

export {Username}
