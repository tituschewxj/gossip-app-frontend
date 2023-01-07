// import logo from './logo.svg';
import React, { useEffect, useState } from "react"
import './App.css'
// import axios from "./api/axios"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar/Navbar"
// import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import AuthenticationPage from "./pages/AuthenticationPage"
import EditPage from "./pages/EditPage"
import ThreadPage from "./pages/ThreadPage"
import ProfilePage from "./pages/ProfilePage"
// import { UserContext } from "./hooks/context"
import { updateJWTToken } from "./api/authenticationApi"
import ResultsPage from "./pages/ResultsPage"


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [username, setUsername] = useState('')

  // const userContext: UserContext = {
  //   isLoggedIn: isLoggedIn,
  //   username: username,
  //   setIsLoggedIn: (val: boolean) => {
  //     setIsLoggedIn(val)
  //     localStorage.setItem('loggedIn', `${val}`)
  //   },
  //   setUsername: (val: string) => {
  //     setUsername(val)
  //     localStorage.setItem('username', val)
  //   },
  // }

  useEffect(() => { 
    updateJWTToken()
    // if (localStorage.getItem('token')) {
    //   // setIsLoggedIn(localStorage.getItem('loggedIn') === 'true')
    //   // setUsername(localStorage.getItem('username') as string)
    // }
  }, [])
  return (
    <>
      {/* <UserContext.Provider value={userContext}> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthenticationPage authenticationOperation="login"/>} />
          <Route path="/logout" element={<AuthenticationPage authenticationOperation="logout"/>} />
          <Route path="/register" element={<AuthenticationPage authenticationOperation="register"/>} />

          <Route path="/posts/:post_id" element={<ThreadPage />} />
          <Route path="/new_post" element={<EditPage editType="new"/>} />
          <Route path="/posts/:post_id/edit" element={<EditPage editType="edit"/>} />
          <Route path="/comments/:comment_id/edit" element={<EditPage editType="edit"/>} />

          <Route path="/edit_profile" element={<EditPage editType="edit_profile"/>} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/search" element={<ResultsPage />} />
          
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      {/* </UserContext.Provider> */}
    </>
  )
}

export default App
