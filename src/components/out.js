import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function LogOut() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleOut = useCallback(() => {
    logout();
    navigate('about');
  }, [logout, navigate]);

  return (
    <div className="component">
      LogOut Page
      <br />
      <div>
        <button onClick={handleOut}>Log out</button>
      </div>
    </div>
  );
}
