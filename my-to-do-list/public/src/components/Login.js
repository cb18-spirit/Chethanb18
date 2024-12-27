import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../services/authService';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Redirect to the to-do list page after successful login
      window.location.href = '/todolist';
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Button variant="contained" onClick={handleGoogleSignIn}>
        Sign in with Google
      </Button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Login;