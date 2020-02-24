// Modules
import React, { useState } from 'react';

// Service
import AuthService from '../services/auth.service';

// Helper
import clearErrorDiv from '../utils/clearErrorDiv';

// Material UI stuff
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  console.log('SignUp rendering...');

  const classes = useStyles();

  // Global error object to keep track of sign-up errors.
  const inputErrors = {};
  
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [state, setState] = useState(initialState);
  // const [confirmPassword, setConfirmPassword] = useState('');

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

    // if (event.target.name === 'confirm-password') {
    //   setConfirmPassword(event.target.value);
    // }
}; // inputHandler

  const submitInput = async event => {
    event.preventDefault(); // Prevent form submission
    
    validateForm(state);

    //---------👇 for visualization only--------
    console.log(state);
    if (Object.keys(inputErrors).length) {
      console.log(inputErrors);
    }
    //----------you may delete this ☝️----------

    // Halt the sign up process if any errors were found
    // during validation i.e. validateForm(state).
    if (Object.keys(inputErrors).length) return;
    
    // Post form data to the server to sign user up
    try {
      const signedUp = await AuthService.signup(state);
      
      console.log('--signedUp--');
      console.log(signedUp);

      // Something went wrong server-side.
      if (signedUp !== true) {
        throw 'Sign Up Error'
      }
    } catch(err) {
      document
        .getElementById("signUpError")
        .textContent = 'Either Username or Email already taken!';
      
      // Clear div with id "signUpError" after 3 seconds.
      clearErrorDiv(3, "signUpError");
    }
  }; // submitInput

  /**
   * validateForm is an impure function that checks user input
   * for errors and populates the inputErrors object if found.
   *
   * @param {*} rawState
   */
  const validateForm = rawState => {
    
    if (rawState.username.length < 3) {
      inputErrors.username = 'Username Too Short';
    }
    
    if (!rawState.username) {
      inputErrors.username = 'Username Required';
    }

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
      inputErrors.password = 'Password MUST be 8 or more characters.';
    }

    if (
      rawState.confirmPassword.length > 0 &&
      rawState.password !== rawState.confirmPassword
    ) {
      inputErrors.confirmPassword = 'Passwords Do Not Match';
    }
    console.log('--confirmPassword--')
    console.log(rawState.confirmPassword.length)

    if (rawState.confirmPassword.length === 0) {
      inputErrors.confirmPassword = 'Confirm Password Required';
    }

    if (
      rawState.confirmPassword.length > 0 && 
      rawState.confirmPassword.length < 8
    ) {
      inputErrors.confirmPassword = 'Password MUST be 8 or more characters.';
    }

    if (inputErrors.username) {
      document
        .getElementById("usernameError")
        .textContent = inputErrors.username;
      clearErrorDiv(2, "usernameError");
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
      clearErrorDiv(4, "passwordError");
    }

    if (inputErrors.confirmPassword) {
      document
        .getElementById("pswdMatchError")
        .textContent = inputErrors.confirmPassword;
      clearErrorDiv(5, "pswdMatchError");
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
          Sign Up
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                placeholder="johndoe"
                value={state.username}
                onChange={ inputHandler }
              /><div id="usernameError" style={{ color: "red" }}></div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                placeholder="johndoe@email.com"
                value={state.email}
                onChange={ inputHandler }
              /><div id="emailError" style={{ color: "red" }}></div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="StrongPassword"
                value={state.password}
                onChange={ inputHandler }
              /><div id="passwordError" style={{ color: "red" }}></div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                placeholder="StrongPassword"
                value={state.confirmPassword}
                onChange={ inputHandler }
              /><div id="pswdMatchError" style={{ color: "red" }}></div>
                <div
                  id="signUpError" 
                  style={
                    { 
                      marginTop: '3px',
                      color: "red",
                      fontSize: '1.2em',
                      fontWeight: '600'
                    }
                  }
                >
                </div>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
            </Grid>
          </Grid>

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className={classes.submit}
            onClick={ submitInput }
          >
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>

        </form>
      </div>
    </Container>
  );
}

export default SignUp;
