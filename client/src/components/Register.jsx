import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // clear previous error
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/timelogs');
    } catch (err) {
      console.error('[Firebase Registration Error]', err.code, err.message);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setErrorMsg('That email is already registered.');
          break;
        case 'auth/invalid-email':
          setErrorMsg('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setErrorMsg('Password must be at least 6 characters.');
          break;
        default:
          setErrorMsg('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {errorMsg && <p style={{ color: 'salmon', marginTop: '1rem' }}>{errorMsg}</p>}
    </div>
  );
}

export default Register;
