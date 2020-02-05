// Modules
import React, { useState } from 'react';

// Service
import AuthService from '../services/auth.service';

// Material UI stuff
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/krispi1">
        Full Stack Dev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

  const initialState = {
    username: '',
    email: '',
    password: ''
  }

  const [state, setState] = useState(initialState);

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

  const submitInput = event => {
    event.preventDefault(); // Prevent form submission
    console.log(state);

    // Post login data to the server to log user in
    AuthService.signup(state);
    setState({ ...initialState });
  } // submitInput


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
              />
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
              />
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
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                placeholder="StrongPassword"
              />
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
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;
