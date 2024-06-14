import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../firebase/firebasePage/firebase';

import styles from './styles/firstpage.module.css';
import openeye from './images/openeye.jpg';
import closeeye from './images/closeeye.jpg';

function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(email, password);
      console.log(user);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      navigate('/login');
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Create an account</h2>
        <span className={styles.newhere}>Already a member?</span>
        <Link to="/login">Login</Link>
      </div>
      <form onSubmit={handleSubmit}>
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
            placeholder="Password"
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
        <button className={styles.button1} type="submit" disabled={!email || !password}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
