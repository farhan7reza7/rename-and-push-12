import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [mess, setMess] = useState('');
  const { login } = useAuth();
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await login({ email });
        setMess(response);
      } catch (err) {
        return setMess(err.message);
      }
      //navigate('/');
    },
    [login, email],
  );

  return (
    <div className="component">
      LogIn Page
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button type="submit">Log In</button>
        </form>
        <div>
          <Link to="/">{mess}</Link>
        </div>
      </div>
    </div>
  );
}
