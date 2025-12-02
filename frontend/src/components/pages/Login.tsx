import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import AuthService, {type RegisterPayload} from '../../services/AuthService';
import './../variables.css';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState('');

  const registerMutation = useMutation({
    mutationFn: (formData: RegisterPayload) => AuthService.registerUser(formData),
    onSuccess: () => {
      console.log('Registered successfully!');
    },
    onError: (err) => {
      console.error('Registration failed:', err);
    }
  });

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerPassword !== registerRepeatPassword) {
      alert('Error: Passwords do not match!');
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
      <h3>Login:</h3>
      <form className="login">
        <p>Username:</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <p>Password:</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <h3>Create Account:</h3>
      <form className="create-account" onSubmit={handleRegisterSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
