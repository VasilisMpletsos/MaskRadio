import React from 'react';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FacebookIcon from '@material-ui/icons/Facebook';

/* TODO:
 * 1. Add styling and icons to the form.
 * 2. On MenuItem click =>
 *      - send request to the server (using axios) for the auth path (see secrets-app template)
 *      - the server responds with res.json containing info about the login (success or not).
 *------- The actions for user loggin will be changed after the transition to useReducer() -----------
 */
const useStyles = makeStyles( theme => ({
  root: {
    textAlign: 'center'
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));

export default function OtherLoginOptions() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Typography>OR</Typography>
      <MenuItem> Sign In with Google</MenuItem>
      <MenuItem><FacebookIcon className={classes.icon} /> Sign In with Facebook</MenuItem>
    </div>
  );
}
