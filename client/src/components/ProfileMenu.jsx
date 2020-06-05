import React, {useState, useContext, useRef} from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { UserContext } from '../context/UserContext';
import { SnackbarContext } from '../context/SnackbarContext';

const useStyles = makeStyles(theme => ({
  menuBtn: {
    '&:focus': {
      outline: 'none'
    },
  },
  avatarImage: {
    color: theme.palette.secondary.dark,
  },
  paper: {
    backgroundColor: theme.palette.third.main,
    marginTop: theme.spacing(2),
  },
}));

/*
 * This component implements the avatar-like button at the top right of the navbar.
 * It is only displayed when the user is logged in, and when clicked it displays
 * various options regarding the user account.
 */
export default function ProfileMenu() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef(null);

  const { setUser } = useContext(UserContext);
  const { setShowSnackbar } = useContext(SnackbarContext);

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setIsOpen(false);
  };

  function handleLogout(e) {
    localStorage.removeItem('userInfo');
    setUser(null);
    setShowSnackbar({ status: true, message: 'Ohh.. leaving so soon..? 😢', severity: 'error' });
  };

  return(
    <div className={classes.root}>
        <Button className={classes.menuBtn}
          ref={anchorRef}
          aria-controls={isOpen ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AccountCircleIcon className={classes.avatarImage} fontSize='large' />
        </Button>
        <Popper open={isOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={isOpen} id="menu-list-grow">
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  )
}
