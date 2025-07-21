import { useEffect, useState } from 'react';
import axios from 'axios';

function Research() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    title: '',
    milestone: '',
    targetDate: '',
    notes: ''
  });

  const API = import.meta.env.VITE_API_BASE + '/api/research'; // or Render URL

  useEffect(() => {
    axios.get(API)
      .then(res => setEntries(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API, form)
      .then(res => {
        setEntries([...entries, res.data]);
        setForm({ title: '', milestone: '', targetDate: '', notes: '' });
      });
  };

  return (
    <section style={{
      backgroundImage: 'url("/bg-research.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh'
    }}>
      <div className="page" style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: '12px',
        padding: '2rem'
      }}>
        <h2>Research Progress</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Paper or Project Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Current Milestone (e.g. Literature Review)"
            value={form.milestone}
            onChange={e => setForm({ ...form, milestone: e.target.value })}
            required
          />
          <input
            type="date"
            value={form.targetDate}
            onChange={e => setForm({ ...form, targetDate: e.target.value })}
            required
          />
          <textarea
            placeholder="Progress Notes"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            rows={4}
            style={{ resize: 'vertical', padding: '0.5rem' }}
          />
          <button type="submit">Update Status</button>
        </form>

        <h3 style={{ marginTop: '2rem' }}>Tracked Research</h3>
        <ul>
          {entries.map(entry => (
            <li key={entry.id}>
              📌 <strong>{entry.title}</strong><br />
              Milestone: {entry.milestone}<br />
              Target: {entry.targetDate}<br />
              Notes: {entry.notes}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Research;
