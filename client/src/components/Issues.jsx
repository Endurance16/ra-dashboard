import { useEffect, useState } from 'react';
import axios from 'axios';

function Issues() {
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState({
    title: '',
    urgency: '',
    status: '',
    details: ''
  });

  const API = import.meta.env.VITE_API_BASE + '/api/issues'; // or Render backend

  useEffect(() => {
    axios.get(API)
      .then(res => setIssues(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API, form)
      .then(res => {
        setIssues([...issues, res.data]);
        setForm({ title: '', urgency: '', status: '', details: '' });
      });
  };

  return (
    <section style={{
      backgroundImage: 'url("/bg-issues.jpg")',
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
        <h2>Issue Logger</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Issue Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <select
            value={form.urgency}
            onChange={e => setForm({ ...form, urgency: e.target.value })}
            required
          >
            <option value="">Select Urgency</option>
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟠 Medium</option>
            <option value="High">🔴 High</option>
          </select>
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            required
          >
            <option value="">Select Status</option>
            <option value="Open">📂 Open</option>
            <option value="Resolved">✅ Resolved</option>
          </select>
          <textarea
            placeholder="Issue Details"
            value={form.details}
            onChange={e => setForm({ ...form, details: e.target.value })}
            rows={3}
          />
          <button type="submit">Log Issue</button>
        </form>

        <h3 style={{ marginTop: '2rem' }}>Reported Issues</h3>
        <ul>
          {issues.map(issue => (
            <li key={issue.id}>
              <strong>{issue.title}</strong> ({issue.urgency})<br />
              Status: {issue.status}<br />
              Details: {issue.details}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Issues;
