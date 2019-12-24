import React from 'react'
import { Fab, Tooltip, Typography, Paper, makeStyles } from '@material-ui/core';
import Head from 'next/head';
import { Container } from 'next/app';
import AddIcon from '@material-ui/icons/Add';
import Header from '../components/header';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  titleContainer: {

  },
  description: {

  },
  addButton: {
    position: 'fixed',
    bottom: 30,
    right: 30
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>IV SlackBot | Članci</title>
      </Head>
      <Header/>
      <Container fixed>
        <Paper className={classes.titleContainer}>
          <Typography variant="h3">
            Svi postovi
          </Typography>
          <Typography className={classes.description}>
            Neki description, test test test test description description description.
          </Typography>
        </Paper>
        <Paper>

        </Paper>
      </Container>
      <Tooltip title="Add">
        <Fab
          color="primary"
          aria-label="add"
          className={classes.addButton}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}

export default Home
