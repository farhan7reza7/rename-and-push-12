import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const [email, setEmail] = useState('');

  /* useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      verifyEmail(token);
    }
  }, [location]);
*/
  // const verifyEmail = async (token) => {
  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('/verify-email', { token });
      //const response = await axios.post('api/verify-email', { email });
      const response = await axios.post('/api/send-verification-email', {
        email,
      });

      setMessage(response.data);
    } catch (error) {
      setMessage('Email verification failed. Please try again.');
    }
  };

  return (
    <div className="component">
      <div>
        <h1>Email Verification</h1>
        <form onSubmit={verifyEmail}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Verify</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
