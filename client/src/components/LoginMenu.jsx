import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';
import OtherLoginOptions from './OtherLoginOptions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(0.5)
  },
  loginBtn: {
    textTransform: 'none',
    color: theme.palette.secondary.light,
    '&:focus': {
      outline: 'none'
    }
  },
  loginForm: {
    justifyContent: 'center',
    '&:hover': {
      cursor: 'default'
    }
  },
  paper: {
    backgroundColor: theme.palette.third.main,
    marginTop: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(1)
  }
}));

/*
 * This compoenent implements the login menu button at the top right of the navbar.
 * When clicked, it displays the Login / Register forms or other login methods.
 */
export default function LoginMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  function handleToggle() {
    setOpen(prevOpen => (!prevOpen));
  };

  function handleClose() {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <Button className={classes.loginBtn}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Typography variant='body1'>Login</Typography>
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.paper} elevation={3}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem className={classes.loginForm} disableTouchRipple>
                    <LoginForm closeMenu={handleClose} />
                  </MenuItem>
                  <Divider className={classes.divider}/>
                  <OtherLoginOptions />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
