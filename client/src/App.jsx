import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://ra-dashboard-ylkj.onrender.com/api/timelogs';

function App() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ date: '', hours: '', task: '', status: '', notes: '' });

  useEffect(() => {
    axios.get(API).then(res => setLogs(res.data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(API, form).then(res => {
      setLogs([...logs, res.data.log]);
      setForm({ date: '', hours: '', task: '', status: '', notes: '' });
    });
  };

  const handleDelete = id => {
    axios.delete(`${API}/${id}`).then(() => setLogs(logs.filter(log => log.id !== id)));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>RA Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
        <input placeholder="Hours" value={form.hours} onChange={e => setForm({ ...form, hours: e.target.value })} required />
        <input placeholder="Task" value={form.task} onChange={e => setForm({ ...form, task: e.target.value })} required />
        <input placeholder="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} required />
        <input placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button type="submit">Add Log</button>
      </form>
      <hr />
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.date} – {log.task} – {log.hours}h – {log.status}
            <button onClick={() => handleDelete(log.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
