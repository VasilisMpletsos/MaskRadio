import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import HideOnScroll from './HideOnScroll';

const useStyles = makeStyles(theme => ({
  btn: {
    borderRadius: '5%'
  },
  logo: {
    borderRadius: '20%',
    marginRight: '1rem',
    width: '3vw',
    height: '5vh'
  }
}));

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <IconButton className={classes.btn} color="inherit" aria-label='menu'>
              <img src="images/signal.png" alt="logo" className={classes.logo} />
              <Typography variant="h6">Mask Radio</Typography>
            </IconButton>

          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
