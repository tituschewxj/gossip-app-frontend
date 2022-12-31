// import logo from './logo.svg';
import React from "react"
import './App.css'
// import axios from "./api/axios"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
// import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import EditPage from "./pages/EditPage"
import ThreadPage from "./pages/ThreadPage"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/edit/:id" element={<PostEditor post={{}}/>} /> */}
        <Route path="/posts/:post_id" element={<ThreadPage />} />
        <Route path="/new_post" element={<EditPage />} />
        <Route path="/posts/:post_id/edit" element={<EditPage />} />
        <Route path="/comments/:comment_id/edit" element={<EditPage />} />
        {/* react router: dynamic segment */}
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  )
}

export default App
