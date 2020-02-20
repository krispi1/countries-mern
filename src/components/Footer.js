import React from 'react';

// Material UI
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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
  ); // return
} // Copyright

function Footer() {
  return (
    <div style={{
      bottom: 0,
      marginTop: "20px",
      marginBottom: "20px",
    }}>
      <Copyright />
    </div>
  )
} // Footer

export default Footer;
