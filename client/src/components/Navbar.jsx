import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate('/login'))
      .catch((err) => alert('Logout failed'));
  };

  return (
    <nav>
      <h2>RA Dashboard</h2>
      <div>
        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/timelogs">Timelogs</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/meetings">Meetings</Link>
            <Link to="/research">Research</Link>
            <Link to="/issues">Issues</Link>
          </>
        )}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00b4d8',
              fontWeight: 'bold',
              marginLeft: '1rem',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
