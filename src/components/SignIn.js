// Modules
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

// Service
import AuthService from '../services/auth.service';

// Helper
import clearErrorDiv from '../utils/clearErrorDiv';

// Material UI stuff
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignIn(props) {
  console.log('SignIn rendering...');
  
  const classes = useStyles();

  /* 
  // Imagine an application with 20 or more input fields.

  // This is the non-scalable way of handling state and 
  // is left here for reference and comparison.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  */

  // Global error object to keep track of sign-in errors.
  const inputErrors = {};
  
  // What follows is the scalable way of handling state.
  const initialState = {
    email: '',
    password: ''
  };
  
  const [state, setState] = useState({ ...initialState });
  
  /* 
  // This section demonstrates the non-scalable way of handling 
  // user input and is left here for reference and comparison.
  
  const onSubmitHandler = event => {
    event.preventDefault();
    const formValue = { email, password };
    
    // Post login data to the server to log user in
    AuthService.login(formValue);
    setEmail('');
    setPassword('');
  } // onSubmitHandler

  const onEmailChange = event => {
    setEmail(event.target.value);
  } // onEmailChange

  const onPasswordChange = event => {
    setPassword(event.target.value);
  } // onPasswordChange
  */


  // For the sake of scalability, it's better to create a 
  // single dynamic input handler that caters to each input 
  // field uniquely.
  const inputHandler = event => {
    // The ...spread operator below ensures that state is
    // not overwritten, but is being swapped out for a new 
    // one whenever changes in state occur.
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  } // inputHandler

  /**
   * submitInput is an impure function that attempts to log
   * the user in by sending their credentials to the back end.
   *   
   * @param {*} event
   * @returns undefined
   */
  const submitInput = async event => {
    event.preventDefault(); // Prevent form submission.
    
    validateForm(state);

    //---------👇 for visualization only--------
    console.log(state);
    if (Object.keys(inputErrors).length) {
      console.log(inputErrors);
    }
    //----------you may delete this ☝️----------
    
    // Halt the login process if any errors were found
    // during validation i.e. validateForm(state).
    if (Object.keys(inputErrors).length) return;

    // Post login data to the server to log user in.
    try {
      const loggedIn = await AuthService.login(state);
      
      // Something went wrong server-side.
      if (loggedIn !== true) {
        throw 'Login Error'
      }
    } catch(err) {
      document
        .getElementById("loginError")
        .textContent = 'Check your Email & Password';
      
      // Clear div with id "loginError" after 3 seconds.
      clearErrorDiv(3, "loginError");
    }
  }; // submitInput

  /**
   * validateForm is an impure function that checks user input
   * for errors and populates the inputErrors object if so.
   *
   * @param {*} rawState
   */
  const validateForm = rawState => {

    // Validate email
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript/46181#46181
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(rawState.email)) {
      inputErrors.email = 'Invalid Email';
    }
    
    if (rawState.email.length === 0) {
      inputErrors.email = 'Email Required';
    }

    
    if (!rawState.password) {
      inputErrors.password = 'Password Required';
    }

    if (
      rawState.password.length > 0 && 
      rawState.password.length < 8
    ) {
      inputErrors.password = 'Password Must be 8 or more characters.';
    }

    if (inputErrors.email) {
      document
        .getElementById("emailError")
        .textContent = inputErrors.email;
      clearErrorDiv(3, "emailError");
    }

    if (inputErrors.password) {
      document
        .getElementById("passwordError")
        .textContent = inputErrors.password;
      clearErrorDiv(3, "passwordError");
    }
  }; // validateForm


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        {/* 
        Make form input handling dynamic and scalable.

        Below, the non-scalable way of handling input for 
        each field separately is given up (commented out).

        A dynamic inputHandler is adopted instead.
        */}
        <form method="POST" className={classes.form}>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            placeholder="johndoe@email.com"
            // value={email}
            value={state.email}
            // onChange={ onEmailChange }
            onChange={ inputHandler }
          /><div id="emailError" style={{ color: "red" }}></div>
 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            placeholder="StrongPassword"
            // value={password}
            value={state.password}
            // onChange={ onPasswordChange }
            onChange={ inputHandler }
          /><div id="passwordError" style={{ color: "red" }}>
            </div>
            <div 
              id="loginError" 
              style={
                { 
                  color: "red",
                  fontWeight: '800'
                }
              }
            >
            </div>
 
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className={classes.submit}
            // onClick={ onSubmitHandler }
            onClick={ submitInput }
          >Sign In</Button>
 
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
 
            <Grid item>
              <Link  href="/signup" variant="body2">
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>

        </form>
      </div>
    </Container>
  );
}

export default withRouter(SignIn);
