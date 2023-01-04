import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { userLogout } from '../api/authenticationApi'
import { getProfileByUsername } from '../api/forumApi'
import DefaultButton from '../components/Form/DefaultButton'

function ProfilePage() {
  // Page for viewing the profile of a user
  const { username } = useParams()
  const navigate = useNavigate()
  const { data: forumProfile } = useQuery('get_profile', () => getProfileByUsername(`${username}`))
  const { mutate: logout } = useMutation(async () => userLogout())
  
  return (
    <>
      <div>i need to build the profile page</div>
      {username}
      {forumProfile?.username}
      {forumProfile?.description}
      <DefaultButton onClick={() => logout()} text={'Logout'} />
    </>
  )
}

export default ProfilePage