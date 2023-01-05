import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppBar, Toolbar, Typography } from '@mui/material'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import CreateIcon from '@mui/icons-material/Create'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


import NavigateIconButton from './DefaultIconButton'
import useLoginState from '../hooks/useLoginState'
import useUserProfile from '../hooks/useUserProfile'
import { useQuery } from 'react-query'
import { getTags } from '../api/forumApi'
import Searchbar from './Searchbar'


function Navbar() {
  const navigate = useNavigate()
  const isLoggedIn = useLoginState()
  const username = useUserProfile()?.username

  const [tags, setTags] = useState<string[]>([])
  useQuery('get_all_tags', () => getTags(), {
    onSuccess: (res: ForumTag[]) => {
      setTags(res.map(tag => tag.name))
      console.log(res)
    }
  })

  const [searchTags, setSearchTags] = useState<string[]>([])
  const handleSearch = () => {
    console.log(searchTags)
  }
  return (
    <AppBar position="sticky" >
      <Toolbar >
        <Typography variant="h4" sx={{ flex: 1 }}>Gossip App</Typography>
        <NavigateIconButton icon={<HomeOutlinedIcon />} tooltipTitle={'Home'} onClick={() => navigate('/')} />
        <NavigateIconButton icon={<CreateIcon />} tooltipTitle={'Create post'} onClick={() => {
          navigate('/new_post')
          // navigate(0)
        }} />
        <Searchbar tags={tags} onChange={setSearchTags} handleSubmit={handleSearch} />
        {!isLoggedIn && <NavigateIconButton icon={<LoginOutlinedIcon />} tooltipTitle={'Login'} onClick={() => navigate('/login')} />}
        {isLoggedIn && username && <NavigateIconButton icon={<AccountCircleOutlinedIcon />} tooltipTitle={'Profile'} onClick={() => navigate(`/profile/${username}`)} />}
      </Toolbar>
    </AppBar>
  )
}
export default Navbar