import React, { useState, useEffect } from 'react'
import { Paper, Container, Fab, Tooltip, makeStyles, Link, Chip, Button, Typography, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@material-ui/core';
import Head from 'next/head';
import AddIcon from '@material-ui/icons/Add';
import Header from '../components/header';
import { getArticles, deleteArticle, acceptNewArticle, addNewArticle } from '../utils/dataAccess';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(() => ({
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
    maxWidth: 300,
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
  const [articles, setArticles] = useState(props.articles);
  const [tag, setTag] = useState('');
  const [link, setLink] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const classes = useStyles();

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

  function handleAddArticle (){
    addNewArticle(link, tag).then(() => {
      updateData();
      handleClose();
    })
  }

  const openModal = () => {
    setIsAddModalOpen(true);
  };

  const handleClose = () => {
    setIsAddModalOpen(false);
    setLink('');
    setTag('');
  };

  return (
    <div>
      <Head>
        <title>IV SlackBot | Članci</title>
      </Head>
      <Header/>
      <Container className={classes.container}>
        {/* <TitleContainer
          title={title}
          description={description}
        /> */}
        <Paper className={classes.dataContainer}>
          {/* ACCEPTED */}
          <div className={classes.dataColumn}>
            <Typography variant="h4">
              Prihvaćeni članci
            </Typography>
            {
              articles.filter(article => article.accepted).map((article) => (
                <Paper key={article._id} elevation={3} className={classes.item}>
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
            <Typography variant="h4">
              Na čekanju
            </Typography>
            {
              articles.filter(article => !article.accepted).map((article) => (
                <Paper key={article._id} elevation={3} className={classes.item}>
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
          onClick={openModal}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog open={isAddModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Dodaj novi članak</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tag"
            fullWidth
            onChange={(e) => setTag(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="link"
            type="email"
            fullWidth
            onChange={(e) => setLink(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Odustani
          </Button>
          <Button onClick={handleAddArticle} color="primary">
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
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
