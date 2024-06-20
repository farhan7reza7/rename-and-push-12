import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email }); // Use relative path
      //const response = await axios.get('api/test');
      //setMessage('Check your email for verification link ');
      /*if (res.data === 'Success') {
        navigate('/');
      }*/
      setMessage(res);
    } catch (error) {
      setMessage('Registration failed, ' + error.message);
    }
  };

  return (
    <div className="component">
      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Register;
