import { AppBar, Button, Icon, IconButton, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import NavigateIconButton from './DefaultIconButton';
import CreateIcon from '@mui/icons-material/Create';

const useStyles = makeStyles({
  // style for search bar
  searchStyle: {
    backgroundColor: "white",
    borderRadius: 5,
  }
});

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();

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
        <NavigateIconButton icon={<LoginOutlinedIcon />} tooltipTitle={'Login'} onClick={() => navigate('/login')} />
      </Toolbar>
    </AppBar>
  )
}
export default Navbar