import React from 'react'
import { Container, Fab, Tooltip, makeStyles } from '@material-ui/core';
import Head from 'next/head';
import AddIcon from '@material-ui/icons/Add';
import Header from '../components/header';
import TitleContainer from '../components/titleContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  container: {
    paddingTop: '1rem'
  },
  addButton: {
    position: 'fixed',
    bottom: 30,
    right: 30
  }
}));

const Home = () => {
  const classes = useStyles();

  const title = "Svi postovi";
  const description = "Neki description, test test test test description description description.Neki description, test test test test description description description.";

  return (
    <div>
      <Head>
        <title>IV SlackBot | Članci</title>
      </Head>
      <Header/>
      <Container className={classes.container}>
       <TitleContainer
        title={title}
        description={description}
      />
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
