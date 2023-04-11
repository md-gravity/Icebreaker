'use client'
import {type ChangeEvent, type FormEvent, useState} from 'react'

import {useCurrentUser} from '@app/store/current-user'
import {usePassportClient} from '@app/store/passport-client'

function User() {
  const [authUser, setUser] = useCurrentUser()

  const [username, setUsername] = useState(authUser?.username ?? '')
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const passportClient = usePassportClient()
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    send()

    async function send() {
      const {user, token} = await passportClient.createTemporalUser.mutate({
        username,
      })
      setUser(user)
      const DEFAULT_MAX_AGE = 24 * 60 * 60 * 1000
      const userCookie = `jwt=${token}; domain=gravity.io; max-age=${DEFAULT_MAX_AGE}`
      document.cookie = userCookie
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

export {User}
