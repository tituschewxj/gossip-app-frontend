import React, { useContext } from 'react'
import { useMutation } from 'react-query'
import { userLogin } from '../api/authenticationApi'
// import axios from '../api/axios'

import DefaultFormCard from '../components/DefaultFormCard'
import { UserContext } from '../hooks/context'
import { initForumRegister, initForumUser } from '../types/typeDefaults'

function LoginPage() {
  const { setIsLoggedIn, setUsername } = useContext(UserContext)

  const { mutate } = useMutation(async (forumUser: ForumUser) => {
    return userLogin(forumUser)
  }, {
    onSuccess: (res) => {
      setIsLoggedIn?.(true)
      setUsername?.(res.data.email)
      console.log(res.data.email)
    }
  }
  
  )
  function handleLogin() {
    // testing code
    // https://github.com/DakotaLMartinez/rails-devise-jwt-tutorial
    // login

    mutate({ email: "test@test.com", password: "password"} as ForumUser)
    // axios.post('login', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   user: {
    //     email: "test@test.com",
    //     password: "password",
    //   },
    // }).then((res: any) => {
    //   // console.log(res)
    //   console.log(res.data)
    //   // console.log(res.headers.get("Authorization"));
    //   localStorage.setItem("token", res.headers.get("Authorization"));
    //   // console.log("sucessfully logged in")
    // }).catch((err) => console.error(err));
  }
  function handleLogout() {
    
    // axios.delete('logout', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: localStorage.getItem("token"),
    //   },
    // }).then((res: any) => {
    //   console.log(res.data)
    //   localStorage.removeItem('token')
    // }).catch((err) => console.error(err));
  }
  function handleSignup() {
    // axios.post('signup', {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   user: {
    //     email: "tessts@test.com",
    //     password: "password",
    //   },
    // }).then((res: any) => {
    //   console.log(res.data)
    //   localStorage.setItem("token", res.headers.get("Authorization"))
    // }).catch((err) => console.error(err));
  }


  return (
    <DefaultFormCard formBehaviour={{
      type: 'login',
      handleSubmit: handleLogin,
      handleCancel: undefined,
      handleDelete: undefined,
      handleAfterSubmit: undefined
    }} forumObject={initForumUser()} />
  )
}

export default LoginPage