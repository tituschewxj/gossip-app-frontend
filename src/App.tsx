// import logo from './logo.svg';
import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import './App.css'

import Navbar from "./components/Navbar/Navbar"

import HomePage from "./pages/HomePage"
import AuthenticationPage from "./pages/AuthenticationPage"
import EditPage from "./pages/EditPage"
import ThreadPage from "./pages/ThreadPage"
import ProfilePage from "./pages/ProfilePage"
import ResultsPage from "./pages/ResultsPage"
import NotFound from "./pages/NotFound"

import { updateJWTToken } from "./api/authenticationApi"
import PrivateRoute from "./components/Routes/PrivateRoute"
import DefaultDialog from "./components/DefaultDialog"
import { useErrorState } from "./hooks/useErrorState"



function App() {
  const { hasError, setHasError } = useErrorState()
  useEffect(() => {
    updateJWTToken()
  }, [])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthenticationPage authenticationOperation="login" />} />
        <Route path="/register" element={<AuthenticationPage authenticationOperation="register" />} />

        <Route path="/posts/:post_id" element={<ThreadPage />} />
        <Route path="/new_post" element={<PrivateRoute><EditPage editType="new" /></PrivateRoute>} />
        <Route path="/posts/:post_id/edit" element={<PrivateRoute><EditPage editType="edit" /></PrivateRoute>} />
        <Route path="/comments/:comment_id/edit" element={<PrivateRoute><EditPage editType="edit" /></PrivateRoute>} />

        <Route path="/edit_profile" element={<PrivateRoute><EditPage editType="edit_profile" /></PrivateRoute>} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/search" element={<ResultsPage />} />

        <Route path="*" element={<NotFound/>} />
      </Routes>
      {hasError && <DefaultDialog open={hasError} dialogBehaviour={{
        type: 'error',
        handleClose: () => setHasError(false),
      }} />}
    </>
  )
}

export default App
