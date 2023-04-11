'use client'
import {type ChangeEvent, type FormEvent, useState} from 'react'

import {useCreateTemporalUser} from '@app/services/create-temporal-user'
import {useCurrentUserQuery} from '@app/services/current-user'

function UserForm() {
  const currentUser = useCurrentUserQuery()
  const createTemporalUser = useCreateTemporalUser()

  const [username, setUsername] = useState(currentUser.data?.username ?? '')
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const usernameUpdated =
    currentUser.data && currentUser.data.username !== username
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (usernameUpdated) {
      console.warn('Implement update user mutation')
    } else {
      createTemporalUser.mutate({username})
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Username:</legend>
        <input
          name="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <br />
        <button type="submit">{usernameUpdated ? 'Update' : 'Save'}</button>
      </fieldset>
    </form>
  )
}

export {UserForm}
