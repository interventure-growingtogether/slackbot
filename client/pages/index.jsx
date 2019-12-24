import React, { useState } from 'react'
import { Paper, Container, Fab, Tooltip, makeStyles, Link, Chip, Button } from '@material-ui/core';
import Head from 'next/head';
import AddIcon from '@material-ui/icons/Add';
import Header from '../components/header';
import TitleContainer from '../components/titleContainer';
import { getArticles, deleteArticle, acceptNewArticle } from '../utils/dataAccess';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

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
    flex: 1,
    padding: '1rem'
  },
  item: {
    margin: '1rem 0',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center'
  },
  itemTags: {
    display: 'flex'
  },
  tag: {
    margin: '0 .1rem'
  },
  itemLink: {
    paddingLeft: '1rem',
    flex: 1,
    maxWidth: 200,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxHeight: 20
  },
  itemActions: {
    justifyContent: 'flex-end',
    display: 'flex',
    marginLeft: 'auto'
  },
  itemAction: {
    margin: '0 .25rem',
  },
  addButton: {
    position: 'fixed',
    bottom: 30,
    right: 30
  }
}));

const Home = (props) => {
  console.log(props.articles);
  const [articles, setArticles] = useState(props.articles)
  const classes = useStyles();


  const title = "Prihvaceni članci";
  const description = "Na cekanju";

  function updateData () {
    getArticles().then((data) => {
      setArticles(data)
    })
  }

  function handleDeleteArticle (id) {
    deleteArticle(id).then(() => {
      updateData()
    })
  }

  function handleAcceptArticle (id){
    acceptNewArticle(id).then(() => {
      updateData()
    })
  }

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
          {/* ACCEPTED */}
          <div className={classes.dataColumn}>

          {
              articles.filter(article => article.accepted).map((article) => (
                <Paper elevation={3} className={classes.item}>
                  <div className={classes.itemTags}>
                    {
                      article.tags.map(tag => (
                        <Chip label={tag} className={classes.tag} />
                      ))
                    }
                  </div>
                  <div className={classes.itemLink}>
                    <Tooltip title={article.link}>
                      <Link href={article.link}>
                        {article.link}
                      </Link>
                    </Tooltip>
                  </div>
                  <div className={classes.itemActions}>                    
                    <Tooltip title="Izbriši">
                      <Button 
                        color="default" 
                        variant="contained"
                        className={classes.itemAction}
                        onClick={() => handleDeleteArticle(article._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </Paper>
              ))
            }
          </div>
          {/* NOT ACCEPTED */}
          <div className={classes.dataColumn}>
          {
              props.articles.filter(article => !article.accepted).map((article) => (
                <Paper elevation={3} className={classes.item}>
                  <div className={classes.itemTags}>
                    {
                      article.tags.map(tag => (
                        <Chip label={tag} className={classes.tag} />
                      ))
                    }
                  </div>
                  <div className={classes.itemLink}>
                    <Tooltip title={article.link}>
                      <Link href={article.link}>
                        {article.link}
                      </Link>
                    </Tooltip>
                  </div>
                  <div className={classes.itemActions}>
                    <Tooltip title="Dozvoli">
                      <Button
                        color="secondary"
                        variant="contained"
                        className={classes.itemAction}
                        onClick={() => handleAcceptArticle(article._id)}
                      >
                        <DoneIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Odbaci">
                      <Button 
                        color="default" 
                        variant="contained"
                        className={classes.itemAction}
                        onClick={() => handleDeleteArticle(article._id)}
                      >
                        <ClearIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </Paper>
              ))
            }
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
    articles: data
  };
};

export default Home
