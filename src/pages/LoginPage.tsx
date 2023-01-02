import React from 'react'
import axios from '../api/axios'

import DefaultFormCard from '../components/DefaultFormCard'
import { initForumRegister, initForumUser } from '../types/typeDefaults'

function LoginPage() {

  function handleLogin() {
    // testing code
    // https://github.com/DakotaLMartinez/rails-devise-jwt-tutorial
    // login
    axios.post('login', {
      headers: {
        'Content-Type': 'application/json',
      },
      user: {
        email: "test@test.com",
        password: "password",
      },
    }).then((res: any) => {
      // console.log(res)
      console.log(res.data)
      // console.log(res.headers.get("Authorization"));
      localStorage.setItem("token", res.headers.get("Authorization"));
      // console.log("sucessfully logged in")
    }).catch((err) => console.error(err));
  }
  function handleLogout() {
    axios.delete('logout', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("token"),
      },
    }).then((res: any) => {
      console.log(res.data)
    }).catch((err) => console.error(err));
  }
  function handleSignup() {
    axios.post('signup', {
      headers: {
        "Content-Type": "application/json",
      },
      user: {
        email: "tessts@test.com",
        password: "password",
      },
    }).then((res: any) => {
      console.log(res.data)
      localStorage.setItem("token", res.headers.get("Authorization"))
    }).catch((err) => console.error(err));
  }


  return (
    <DefaultFormCard formBehaviour={{
      type: 'login',
      handleSubmit: handleSignup,
      handleCancel: undefined,
      handleDelete: undefined,
      handleAfterSubmit: undefined
    }} forumObject={initForumUser()} />
  )
}

export default LoginPage