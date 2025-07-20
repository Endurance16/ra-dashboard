import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h2>RA Dashboard</h2>
      <div>
        <Link to="/timelogs">Timelogs</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/meetings">Meetings</Link>
        <Link to="/research">Research</Link>
        <Link to="/issues">Issues</Link>
      </div>
    </nav>
  );
}

export default Navbar;
