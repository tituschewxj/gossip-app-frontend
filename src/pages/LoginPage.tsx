import React from 'react'
import axios from '../api/axios'

import DefaultFormCard from '../components/DefaultFormCard'
import { initForumUser } from '../types/typeDefaults'

function LoginPage() {

  function handleSubmit() {
    // testing code
    // https://github.com/DakotaLMartinez/rails-devise-jwt-tutorial#add-respond_with-using-fast_jsonapi-method
    // axios.post('signup', {
    //   user: {
    //     email: "test@test.com",
    //     password: "password",
    //   },
    // }).then((res) => {
    //   if (res.ok) {
    //     console.log(res.headers.get("authorization");
    //     localStorage.setItem("token", res.headers.get("authoriazation"));
    //     return res.json();
    //   } else {
    //     throw new Error(res);
    //   }
    // })
    // .then((json) => console.dir(json))
    // .catch((err) => console.error(err));




  }
  return (
    <DefaultFormCard formBehaviour={{
      type: 'login',
      handleSubmit: handleSubmit,
      handleCancel: undefined,
      handleDelete: undefined,
      handleAfterSubmit: undefined
    }} forumObject={initForumUser()} />
  )
}

export default LoginPage