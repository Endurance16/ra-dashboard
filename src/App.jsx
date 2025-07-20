import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Timelogs from './components/Timelogs';
import Tasks from './components/Tasks';
import Meetings from './components/Meetings';
import Research from './components/Research';
import Issues from './components/Issues';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timelogs" element={<Timelogs />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/research" element={<Research />} />
        <Route path="/issues" element={<Issues />} />
      </Routes>
    </Router>
  );
}

export default App;
