import { Button } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ProfilePage() {
  // Page for viewing the profile of a user
  const { username } = useParams()
  const navigate = useNavigate()

  return (
    <>
      {username}
      <Button onClick={() => navigate('/logout')}>Logout</Button>
    </>
  )
}

export default ProfilePage