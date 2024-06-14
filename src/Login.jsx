import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/firstpage.module.css'
import openeye from './images/openeye.jpg'
import closeeye from './images/closeeye.jpg'

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      navigate('/chat');
    } else {
      alert('Email və ya şifrə yanlışdır');
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Welcome Back</h2>
        <span className={styles.newhere}>New here?</span>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div className={styles.input1}>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.input2}>
        <input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          src={passwordVisible ? openeye : closeeye}
          className={styles.openeye}
          onClick={togglePasswordVisibility}
          alt="Toggle visibility"
        />
      </div>
      <button className={styles.button1} onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;





