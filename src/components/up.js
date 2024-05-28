/*import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
export default function SignUp() {
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleUp = useCallback(() => {
    signup();
    navigate('/');
  }, [signup, navigate]);

  return (
    <div className="component">
      SignUp Page
      <div>
        <button onClick={handleUp}>Sign Up</button>
      </div>
    </div>
  );
}
*/
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('api/register', { email }); // Use relative path
      const response = await axios.get('api/test');
      setMessage(response.data.message);
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
