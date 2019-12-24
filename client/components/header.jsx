import React from 'react'
import Link from 'next/link'
import {  AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
  header: {
    justifyContent: 'space-between'
  },
  
}));

const Header = () => {
  const classes = useStyles();

  return(
    <AppBar position="static">
      <Toolbar className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Slackbot
        </Typography>  
        <div>
          <Link href="/">
            <Button color="inherit">Članci</Button>
          </Link>
          <Link href="/ops">
            <Button color="inherit">Admin</Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header;