'use client'
import {type ChangeEvent, type FormEvent, useState} from 'react'

import {useCreateTemporalUser} from '@app/services/create-temporal-user'
import {useCurrentUserQuery} from '@app/services/current-user'

function User() {
  const currentUser = useCurrentUserQuery()

  const [username, setUsername] = useState(currentUser.data?.username ?? '')
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const createTemporalUser = useCreateTemporalUser()
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    createTemporalUser.mutate({username})
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
