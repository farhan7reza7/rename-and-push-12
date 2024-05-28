import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
export default function LogIn() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = useCallback(() => {
    login();
    navigate('/');
  }, [login, navigate]);

  return (
    <div className="component">
      LogIn Page
      <div>
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
}
