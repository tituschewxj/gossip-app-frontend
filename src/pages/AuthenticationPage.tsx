import React, { useContext } from 'react'
import { useMutation } from 'react-query'
import { userLogin, userLogout, userSignup } from '../api/authenticationApi'
import { addProfile } from '../api/forumApi'
// import axios from '../api/axios'

import DefaultFormCard from '../components/DefaultFormCard'
import { UserContext } from '../hooks/context'
import { initForumRegister, initForumUser } from '../types/typeDefaults'

function AuthenticationPage(props: { authenticationOperation: AuthenticationOperation }) {
  const { setIsLoggedIn, setUsername } = useContext(UserContext)
  const forumObject = props.authenticationOperation === 'login'
    ? initForumUser()
    : props.authenticationOperation === 'register'
    ? initForumRegister()
    : {} as ForumObject

  const { mutate } = useMutation(async (props: { forumUser: ForumUser, authenticationOperation: AuthenticationOperation }) => {
    switch (props.authenticationOperation) {
      case 'login':
        return userLogin(props.forumUser)
      case 'register':
        return userSignup(props.forumUser)
      case 'logout':
        return userLogout()
      default:
        break;
    }
  }, {
    onSuccess: (res) => {
      if (props.authenticationOperation === 'logout') {
        setIsLoggedIn?.(false)
        setUsername?.('')
      }
      if (res) {
        if (props.authenticationOperation === 'login') {
          setIsLoggedIn?.(true)
        }        
        setUsername?.(res.data.email)
      }
      if (props.authenticationOperation === 'register') {
        addProfile({
          type: 'profile',
          username: 'test',
          description: '',
          user_id: 1,
        })
      }
    }
  }

  )
  function handleSubmit() {
    switch (props.authenticationOperation) {
      case 'login':
        return handleLogin()
      case 'register':
        return handleSignup()
      case 'logout':
        return handleLogout()
      default:
        break;
    }
  }
  function handleLogin() {
    mutate({ forumUser: { email: "test@test.com", password: "password" } as ForumUser, authenticationOperation: 'login' })
  }
  function handleLogout() {
    mutate({ forumUser: { email: "test@test.com", password: "password" } as ForumUser, authenticationOperation: 'logout' })
  }
  function handleSignup() {
    mutate({ forumUser: { email: "test@test.com", password: "password" } as ForumUser, authenticationOperation: 'register' })
  }


  return (
    <DefaultFormCard formBehaviour={{
      type: props.authenticationOperation,
      handleSubmit: handleSubmit,
      handleCancel: undefined,
      handleDelete: undefined,
      handleAfterSubmit: undefined
    }} forumObject={forumObject} />
  )
}

export default AuthenticationPage