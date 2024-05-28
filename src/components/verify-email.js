import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      verifyEmail(token);
    }
  }, [location]);

  const verifyEmail = async (token) => {
    try {
      const response = await axios.post('/verify-email', { token });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Email verification failed. Please try again.');
    }
  };

  return (
    <div className="component">
      <div>
        <h1>Email Verification</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
