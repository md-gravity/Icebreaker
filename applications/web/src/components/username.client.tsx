'use client'
import {FormEvent, useState} from 'react'

import {passportClient} from '@app/lib/passport.client'
import {useUserContext} from '@app/store/user'

function UsernameClient() {
  const [user, setUser] = useUserContext()

  const [username, setUsername] = useState('')
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  const onSend = (event: FormEvent) => {
    event.preventDefault()

    send()

    async function send() {
      setUser(await passportClient.createTemporalUser.mutate({username}))
    }
  }

  if (user) {
    return <h1>Hello {user.username}</h1>
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

export {UsernameClient}
