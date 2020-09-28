import React, { useState, useContext } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';

import { UserContext } from '../context/UserContext';
import { SnackbarContext } from '../context/SnackbarContext';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: 0,
    width: '90%'
  },
  headingText: {
    marginBottom: theme.spacing(2)
  },
  inputText: {
    marginBottom: theme.spacing(1)
  },
  buttonsGroup: {
    justifyContent: 'space-between'
  },
  submitBtn: {
    '&:focus': {
      outline: 'none'
    }
  }
}));

/* The LoginForm compoment implements both the Login and/or Register of the user.
 * The 2 separate states are dictated by the boolean state variable 'login'.
 * Depending on the state, the form displayes the appropriate fields.
 * TODO: Separate the 2 forms to different components and handle them via the parent
 * component using useReducer
 */
export default function LoginForm(props) {
  const classes = useStyles();
  const [login, setLogin] = useState(true);
  const [formData, setFormData] = useState({username: '', password: '', pswdConfirm: ''});
  const [error, setError] = useState({status: false, target:'', msg:''});
  const { setUser } = useContext(UserContext);
  const { setShowSnackbar } = useContext(SnackbarContext);

  function handleFormData(e) {
    const {name, value} = e.target;

    setFormData(prevFormData => ({...prevFormData, [name]: value}));
  }

  function handleBtnClick(e) {
    setError({status: false, target:'', msg: ''});

    const action = e.target.textContent;
    if (action === 'Login' ? login : !login) { // XOR implementation
      submitForm();
    } else {
      setFormData({username: '', password: '', pswdConfirm: ''});
      setLogin(!login);
    }
  }

  /* The submitForm function implements both the login and the register requests.
   * In both cases a post request is made to the server with the user info. Depending on the server's
   * response, appropriate errors or success messages are displayed.
   */
  function submitForm() {

    setError({status: false, target:'', msg: ''}); // reset previous errors

    if (!login && formData.password !== formData.pswdConfirm) {
      setError({status: true, target:'pswdConfirm', msg: 'The passwords do not match'});
      return;
    }

    let uri = window.location.origin;
    uri +=  login ? '/users/login' : '/users';
    axios.post(uri, formData)
      .then(res => {
        // The user has successfully loggedin or registered.
        props.closeMenu();
        setUser(prevUser => ({ ...prevUser, ...res.data}));
        localStorage.setItem('userInfo', JSON.stringify(res.data));

        const snackbarMessage = login ? '🎉  You are logged in!  🎉' : '🎉  Your account has been created!  🎉';
        setShowSnackbar({status: true, message: snackbarMessage, severity: 'success'});
      })
      .catch(err => {
        const target = err.response.data.includes('username') ? 'username' : 'password';
        if ( err.response.status === 400 || err.response.status === 401 ) {
          setError({status: true, target: target, msg: err.response.data});
        };
      });

  }


  return(
    <FormControl component='form' className={classes.root} autoComplete='off' margin='normal'>
      <Typography className={classes.headingText} variant="h4">{login ? 'Login' : 'Register'}</Typography>
      <TextField className={classes.inputText}
        name='username'
        label='Username'
        type='text'
        value={formData.username}
        onChange={handleFormData}
        error={error.target === 'username' && error.status}
        helperText={error.target === 'username' && error.msg}
        autoComplete='off'
        variant='outlined' color='secondary' />
      <TextField className={classes.inputText}
        name='password'
        label='Password'
        type='password'
        value={formData.password}
        onChange={handleFormData}
        error={error.target === 'password' && error.status}
        helperText={error.target === 'password' && error.msg}
        autoComplete='current-password'
        variant='outlined' color='secondary' />
      {!login &&
        <TextField className={classes.inputText}
          name='pswdConfirm'
          label='Confirm Password'
          type='password'
          value={formData.pswdConfirm}
          onChange={handleFormData}
          error={error.target === 'pswdConfirm' && error.status}
          helperText={error.target === 'pswdConfirm' && error.msg}
          autoComplete='new-password'
          variant='outlined' color='secondary' />
        }

      <FormGroup className={classes.buttonsGroup} row>
        <Button className={classes.submitBtn}
          name='login'
          onClick={handleBtnClick}
          variant={login ? 'contained' : 'outlined'}
          color='secondary'>
          Login
        </Button>
        <Button className={classes.submitBtn}
          name='register'
          onClick={handleBtnClick}
          variant={login ? 'outlined' : 'contained'}
          color='secondary'>
          Register
        </Button>
      </FormGroup>
    </FormControl>
  );
}
