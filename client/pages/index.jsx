import React from 'react'
import { Paper, Container, Fab, Tooltip, makeStyles } from '@material-ui/core';
import Head from 'next/head';
import AddIcon from '@material-ui/icons/Add';
import Header from '../components/header';
import TitleContainer from '../components/titleContainer';
import { getArticles } from '../utils/dataAccess';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  container: {
    paddingTop: '1rem'
  },
  dataContainer: {
    marginTop: '1rem',
    display: 'flex'
  },
  dataColumn: {
    flex: 1
  },
  addButton: {
    position: 'fixed',
    bottom: 30,
    right: 30
  }
}));

const Home = (props) => {
  console.log(props.articles);
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
        <Paper className={classes.dataContainer}>
          <div className={classes.dataColumn}>
          </div>
          <div className={classes.dataColumn}>
          </div>
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
};

Home.getInitialProps = async ({ req }) => {
  const data = await getArticles();
  return {
    ...req.props,
    articles: data
  };
};

export default Home
