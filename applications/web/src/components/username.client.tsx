'use client'
import {type FormEvent, useState} from 'react'

import {usePassportClient} from '@app/store/passport-client'
import {useUserContext} from '@app/store/user'

function UsernameClient() {
  const [user, setUser] = useUserContext()

  const [username, setUsername] = useState(user?.username ?? '')
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const passportClient = usePassportClient()
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    send()

    async function send() {
      setUser(await passportClient.createTemporalUser.mutate({username}))
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Username:</legend>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <br />
        <button type="submit">Send</button>
      </fieldset>
    </form>
  )
}

export {UsernameClient}
