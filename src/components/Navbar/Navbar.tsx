import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, Link, Box } from '@mui/material'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import CreateIcon from '@mui/icons-material/Create'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import NavigateIconButton from '../DefaultIconButton'
import useLoginState from '../../hooks/useLoginState'
import useUserProfile from '../../hooks/useUserProfile'
import { useMutation, useQuery } from 'react-query'
import { getTags } from '../../api/forumApi'
import Searchbar from './Searchbar'
import { userLogout } from '../../api/authenticationApi'

function Navbar() {
  const navigate = useNavigate()
  const isLoggedIn = useLoginState()
  const username = useUserProfile()?.username

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { mutate: logout } = useMutation(async () => userLogout())

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }} >
        <Link href='/' color='inherit' underline='none'>
          <Tooltip title='Home'>
            <Typography variant="h4" sx={{ flex: 1 }}>Gossip App</Typography>
          </Tooltip>
        </Link>

        <Box sx={{ flex: 1, justifyContent: 'center', display: 'flex' }}>
          <Searchbar />
        </Box>

        {!isLoggedIn &&
          <>
            <Tooltip title="Login/Register">
              <IconButton
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <LoginOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Menu id='login-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={() => {
                navigate('/login')
                handleClose()
              }}>Login</MenuItem>
              <MenuItem onClick={() => {
                navigate('/register')
                handleClose()
              }}>Register</MenuItem>
            </Menu>
          </>
        }

        {isLoggedIn && username &&
          <>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar></Avatar>
              </IconButton>
            </Tooltip>

            <Menu id='account-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={() => {
                navigate(`profile/${username}`)
                handleClose()
              }}>Profile</MenuItem>
              <MenuItem onClick={() => {
                navigate(`edit_profile`)
                handleClose()
              }}>Update Profile</MenuItem>
              <MenuItem onClick={() => {
                navigate('/new_post')
                handleClose()
              }}>New Post</MenuItem>
              <MenuItem onClick={() => {
                logout()
                handleClose()
                navigate('/')
              }}>Logout</MenuItem>
            </Menu>
          </>
        }
      </Toolbar>
    </AppBar>
  )
}
export default Navbar