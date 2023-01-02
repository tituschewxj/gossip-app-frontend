import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppBar, TextField, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import CreateIcon from '@mui/icons-material/Create'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import NavigateIconButton from './DefaultIconButton'
import { UserContext } from '../hooks/context'

const useStyles = makeStyles({
  // style for search bar
  searchStyle: {
    backgroundColor: "white",
    borderRadius: 5,
  }
})

function Navbar() {
  const classes = useStyles()
  const navigate = useNavigate()
  const { isLoggedIn, username } = useContext(UserContext)

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" sx={{ flex: 1 }}>Gossip App</Typography>
        <NavigateIconButton icon={<HomeOutlinedIcon />} tooltipTitle={'Home'} onClick={() => navigate('/')} />
        <NavigateIconButton icon={<CreateIcon />} tooltipTitle={'Create post'} onClick={() => navigate('/new_post')} />
        <TextField
          className={classes.searchStyle}
          label="Search" variant='outlined'
          color='secondary'

          fullWidth
          sx={{ flex: 1 }}></TextField>
        {!isLoggedIn && <NavigateIconButton icon={<LoginOutlinedIcon />} tooltipTitle={'Login'} onClick={() => navigate('/login')} />}
        {isLoggedIn && <NavigateIconButton icon={<AccountCircleOutlinedIcon />} tooltipTitle={'Profile'} onClick={() => navigate(`/profile/${username}`)} />}
      </Toolbar>
    </AppBar>
  )
}
export default Navbar