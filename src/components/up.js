import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', { email }); // Use relative path
      //const response = await axios.get('api/test');
      //setMessage('Check your email for verification link ');
      if (res.data === 'Success') {
        navigate('/');
      }
      setMessage(res.data);
    } catch (error) {
      setMessage('Registration failed. Please try again.');
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
