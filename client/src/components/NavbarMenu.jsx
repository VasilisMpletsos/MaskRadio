import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LoginMenu from './LoginMenu';
import ProfileMenu from './ProfileMenu';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { UserContext } from '../context/UserContext';
import { SnackbarContext } from '../context/SnackbarContext';

const useStyles = makeStyles(theme => ({
  root: {

  },
  snackbar: {
    marginTop: theme.spacing(6)
  }
}));

/*
 * The generic menu button component. Currently, it is the top component in the
 * hierarchy, so it is responsible for managing the user loggedin state as well
 * as the snackbar. These states/handlers are passed (as context) to the menu's
 * children, the 'login menu' and the 'profile menu'. Only one of these components
 * will be displayed depending on the user loggedin state.
 */
export default function NavbarMenu() {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState({ status: false, message: '', severity: '' });

  // This ensures that if the component re-renders the user info will be preserved.
  // TODO: Server request to validate that the user is still logged in.
  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');

    if (userInfoString) {
      setUser(JSON.parse(userInfoString));
    }
  }, []);


  return(
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <SnackbarContext.Provider value={{ setShowSnackbar }}>
        { user ?
          <ProfileMenu /> : <LoginMenu />
        }
        </SnackbarContext.Provider>
      </UserContext.Provider>

      <Snackbar className={ classes.snackbar }
        open={ showSnackbar.status }
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={ () => setShowSnackbar({ status: false }) }>
        <MuiAlert
          icon={false}
          elevation={6}
          severity={ showSnackbar.severity }
          variant="filled"
          onClose={ () => setShowSnackbar({ status: false }) }
          >
          { showSnackbar.message }
        </MuiAlert>
      </Snackbar>
    </>
  )
}
