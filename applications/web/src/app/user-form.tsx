'use client'
import {type ChangeEvent, type FC, type FormEvent, useState} from 'react'

import {UserDtoInterface} from '@packages/dtos'

import {useCreateTemporalUser} from '@app/users/hooks/create-temporal-user'

type UserFormComponent = FC<{
  currentUser: UserDtoInterface | null
}>
const UserForm: UserFormComponent = ({currentUser}) => {
  const createTemporalUserMutation = useCreateTemporalUser()

  const [username, setUsername] = useState(currentUser?.username ?? '')
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const usernameUpdated = currentUser && currentUser.username !== username
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (usernameUpdated) {
      console.warn('Implement update user mutation')
    } else {
      createTemporalUserMutation.mutate({username})
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
