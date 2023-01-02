// import logo from './logo.svg';
import React, { useState } from "react"
import './App.css'
// import axios from "./api/axios"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
// import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import EditPage from "./pages/EditPage"
import ThreadPage from "./pages/ThreadPage"
import ProfilePage from "./pages/ProfilePage"
import { UserContext } from "./hooks/context"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const userContext: UserContext = {
    isLoggedIn: isLoggedIn,
    username: username,
    setIsLoggedIn: setIsLoggedIn,
    setUsername: setUsername,
  }
  return (
    <>
      <UserContext.Provider value={userContext}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
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
