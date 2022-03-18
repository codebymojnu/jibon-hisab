import { ThemeProvider } from '@emotion/react';
import { Box, Button, Container, createTheme, CssBaseline, Grid, Modal, Paper, SpeedDial, SpeedDialIcon, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import IconButton from '@mui/material/IconButton';
import useFirebase from '../../hooks/useFirebase';
import { useHistory } from 'react-router-dom';

const SignInForm = () => {
  const history = useHistory();
  const theme = createTheme();
  const { handleSignIn, handleResetPassword } = useFirebase();
  const [checkEmailMessage, setCheckEmailMessage] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    handleSignIn(data.get('email'), password);
    history.push('/add');
  };

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Modal Style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    border: '2px solid #FFF',
    boxShadow: 24,
    p: 4,
  };

  // handle Forgot Password Click

  const resetPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setCheckEmailMessage('Check Your Email');
    handleResetPassword(data.get('email2'));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper sx={{ padding: '27px' }}>
            <Container maxWidth="lg">
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <Box
                >
                  <NavLink exact={true} activeClassName='is-active' to='/login'>Log In</NavLink>
                </Box>
                <Box>
                  <NavLink exact={true} activeClassName='is-active' to='/register'>Register</NavLink>
                </Box>
              </Box>
            </Container>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, padding: '10px' }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button onClick={handleOpen}>
                    Forgot Passoword
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="Reset Email"
          aria-describedby="Reset Email"
        >
          <Box sx={style}>
          <Box
                  sx={{ position: 'absolute', top: 1, right: 16 }}
                  onClick={handleClose}
                >
                  <IconButton>
                    <CancelPresentationIcon/>
                  </IconButton>
                </Box>
            {
              checkEmailMessage && <Typography>Check Your Email</Typography>
            }
            <Box component="form" onSubmit={resetPassword} noValidate sx={{ mt: 1 }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              margin="normal"
              required
              fullWidth
              id="email2"
              placeholder="Enter Your Email"
              name="email2"
              autoComplete="email"
              autoFocus
            />
            <Button variant="contained" sx={{ mt: 2 }} type="submit">Reset Password</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
    </ThemeProvider >
  );
};

export default SignInForm;