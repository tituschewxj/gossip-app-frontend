// import logo from './logo.svg';
import React, { useEffect, useState } from "react"
import './App.css'
// import axios from "./api/axios"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
// import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import AuthenticationPage from "./pages/AuthenticationPage"
import EditPage from "./pages/EditPage"
import ThreadPage from "./pages/ThreadPage"
import ProfilePage from "./pages/ProfilePage"
import { UserContext } from "./hooks/context"
import { updateJWTToken } from "./api/authenticationApi"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const userContext: UserContext = {
    isLoggedIn: isLoggedIn,
    username: username,
    setIsLoggedIn: (val: boolean) => {
      setIsLoggedIn(val)
      localStorage.setItem('loggedIn', `${val}`)
    },
    setUsername: (val: string) => {
      setUsername(val)
      localStorage.setItem('username', val)
    },
  }

  useEffect(() => { 
    updateJWTToken()
    setIsLoggedIn(localStorage.getItem('loggedIn') === 'true')
    setUsername(localStorage.getItem('username') as string)
  }, [username, isLoggedIn])
  return (
    <>
      <UserContext.Provider value={userContext}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthenticationPage authenticationOperation="login"/>} />
          <Route path="/logout" element={<AuthenticationPage authenticationOperation="logout"/>} />
          <Route path="/register" element={<AuthenticationPage authenticationOperation="register"/>} />
          {/* <Route path="/edit/:id" element={<PostEditor post={{}}/>} /> */}
          <Route path="/posts/:post_id" element={<ThreadPage />} />
          <Route path="/new_post" element={<EditPage />} />
          <Route path="/posts/:post_id/edit" element={<EditPage />} />
          <Route path="/comments/:comment_id/edit" element={<EditPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          {/* react router: dynamic segment */}
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
