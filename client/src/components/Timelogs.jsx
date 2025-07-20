import { useEffect, useState } from 'react';
import axios from 'axios';

function Timelogs() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    date: '',
    category: '',
    hours: '',
    description: ''
  });

  const API = 'https://ra-dashboard-ylkj.onrender.com/api/timelogs';

  useEffect(() => {
    axios.get(API)
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API, form)
      .then(res => {
        setLogs([...logs, res.data.log]);
        setForm({ date: '', category: '', hours: '', description: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <section style={{
      backgroundImage: 'url("/bg-timelogs.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh'
    }}>
      <div className="page" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '12px',
        padding: '2rem'
      }}>
        <h2>Timelog Entry</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            required
          />
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="Reading">Reading</option>
            <option value="Writing">Writing</option>
            <option value="Coding">Coding</option>
            <option value="Meetings">Meetings</option>
          </select>
          <input
            type="number"
            placeholder="Hours"
            value={form.hours}
            onChange={e => setForm({ ...form, hours: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Optional Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>

        <h3 style={{ marginTop: '2rem' }}>Previous Logs</h3>
        <ul>
          {logs.map(log => (
            <li key={log.id}>
              📅 <strong>{log.date}</strong> | {log.category} | {log.hours} hours | {log.description || '—'}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Timelogs;
