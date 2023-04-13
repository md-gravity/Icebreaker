'use client'
import {type ChangeEvent, type FormEvent, useState} from 'react'

import {useCreateTemporalUser} from '@app/services/create-temporal-user'
import {useCurrentUserQuery} from '@app/services/current-user'

function UserForm() {
  const currentUserQuery = useCurrentUserQuery()
  const currentUser = currentUserQuery?.data?.user
  const createTemporalUserMutation = useCreateTemporalUser()

  const [username, setUsername] = useState(currentUser?.username ?? '')
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const usernameUpdated = currentUser && currentUser.username !== username
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (usernameUpdated) {
      console.warn('Implement update user mutation')
    } else {
      createTemporalUserMutation.mutate({username})
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </fieldset>
      <button type="submit">{usernameUpdated ? 'Update' : 'Save'}</button>
    </form>
  )
}

export {UserForm}
