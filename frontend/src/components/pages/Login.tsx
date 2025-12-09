import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import AuthService, {
  type LoginPaylod,
  type RegisterPayload
} from '../../services/AuthService';
//import MovieService, { type Movie } from '../../services/MovieService';
import './../variables.css';
import './Login.css';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const { setIsLoggedIn } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState('');

  const [loginErrorText, setLoginErrorText] = useState('');
  const [registerErrorText, setRegisterErrorText] = useState('');

  const registerMutation = useMutation({
    mutationFn: (formData: RegisterPayload) =>
      AuthService.registerUser(formData),
    onSuccess: (data) => {
      setRegisterErrorText('');
      console.log('Registered successfully!');
      localStorage.setItem('accessToken', data.accessToken);
      setIsLoggedIn(true);
    },
    onError: (err) => {
      console.error('Registration failed:', err);
      setRegisterErrorText(String(err));
    }
  });

  const loginMutation = useMutation({
    mutationFn: (formData: LoginPaylod) => AuthService.loginUser(formData),
    onSuccess: (data) => {
      setLoginErrorText('');
      console.log('Login successfully!');
      localStorage.setItem('accessToken', data.accessToken);
      setIsLoggedIn(true);
    },
    onError: (err) => {
      console.error('Login failed:', err);
      setLoginErrorText(String(err));
    }
  });

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginEmail == '' || loginPassword == '') {
      setLoginErrorText(
        'One or more text fields are empty. Please enter your username and password.'
      );

      return;
    }

    loginMutation.mutate({
      email: loginEmail,
      password: loginPassword
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      registerEmail == '' ||
      registerPassword == '' ||
      registerUsername == '' ||
      registerRepeatPassword == ''
    ) {
      setRegisterErrorText(
        'One or more text fields are empty. Please enter your email address, username, and password.*'
      );

      return;
    }

    if (registerPassword !== registerRepeatPassword) {
      setRegisterErrorText(
        'Passwords do not match. Please input the same password for both fields.'
      );

      return;
    }

    registerMutation.mutate({
      email: registerEmail,
      username: registerUsername,
      password: registerPassword
    });
  };

  return (
    <div className="login-page">
      <div className="background"></div>
      <form className="login" onSubmit={handleLoginSubmit}>
        <h3>Login</h3>
        <p>Username:</p>
        <input
          type="text"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <br />
        <p>Password:</p>
        <input
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <br />
        <p className="error-text">
          {loginErrorText != '' ? 'Login Error: ' : ''}
          {loginErrorText}
        </p>
        <button type="submit">Submit</button>
      </form>
      <br />
      <form className="create-account" onSubmit={handleRegisterSubmit}>
        <h3>Create Account</h3>
        <p>Email:</p>
        <input
          type="text"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <br />
        <p>Username:</p>
        <input
          type="text"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <br />
        <p>Password:</p>
        <input
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <br />
        <p>Repeat Password:</p>
        <input
          type="password"
          value={registerRepeatPassword}
          onChange={(e) => setRegisterRepeatPassword(e.target.value)}
        />
        <br />
        <p className="error-text">
          {registerErrorText != '' ? 'Registration Error: ' : ''}
          {registerErrorText}
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
