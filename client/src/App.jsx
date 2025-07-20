import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Timelogs from './components/Timelogs';
import Tasks from './components/Tasks';
import Meetings from './components/Meetings';
import Research from './components/Research';
import Issues from './components/Issues';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // ✅ NEW

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/timelogs" element={user ? <Timelogs /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="/meetings" element={user ? <Meetings /> : <Navigate to="/login" />} />
        <Route path="/research" element={user ? <Research /> : <Navigate to="/login" />} />
        <Route path="/issues" element={user ? <Issues /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} /> {/* ✅ NEW */}
      </Routes>
    </Router>
  );
}

export default App;


