import { useEffect, useState } from 'react';
import axios from 'axios';

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [form, setForm] = useState({
    date: '',
    attendees: '',
    notes: ''
  });

  const API = 'https://ra-dashboard-ylkj.onrender.com/api/meetings'; // Or your Render backend

  useEffect(() => {
    axios.get(API)
      .then(res => setMeetings(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API, form)
      .then(res => {
        setMeetings([...meetings, res.data]);
        setForm({ date: '', attendees: '', notes: '' });
      });
  };

  return (
    <section style={{
      backgroundImage: 'url("/bg-meetings.jpg")',
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
        <h2>Meeting Notes</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Attendees"
            value={form.attendees}
            onChange={e => setForm({ ...form, attendees: e.target.value })}
            required
          />
          <textarea
            placeholder="Meeting Summary"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            rows={4}
            style={{ resize: 'vertical', padding: '0.5rem' }}
          />
          <button type="submit">Save Meeting</button>
        </form>

        <h3 style={{ marginTop: '2rem' }}>Past Meetings</h3>
        <ul>
          {meetings.map(meeting => (
            <li key={meeting.id}>
              📅 <strong>{meeting.date}</strong><br />
              👥 {meeting.attendees}<br />
              📝 {meeting.notes}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Meetings;
