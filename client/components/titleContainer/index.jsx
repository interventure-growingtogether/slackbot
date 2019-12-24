import React from 'react';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(()=> ({
    root: {
      padding: '1rem'
    },
    description: {
      maxWidth: 350,
      marginTop: '1rem'
    },
    addButton: {
      position: 'fixed',
      bottom: 30,
      right: 30
    }
}));

const TitleContainer = ({
    title,
    description
}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
          <Typography variant="h3">
            {title}
          </Typography>
          <Typography className={classes.description}>
            {description}
          </Typography>
        </Paper>
    );
}

export default TitleContainer;