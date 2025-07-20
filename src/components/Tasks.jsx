import { useEffect, useState } from 'react';
import axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    dueDate: '',
    status: ''
  });

  const API = 'http://localhost:5000/api/tasks'; // or use your Render URL in production

  useEffect(() => {
    axios.get(API)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API, form)
      .then(res => {
        setTasks([...tasks, res.data]);
        setForm({ title: '', dueDate: '', status: '' });
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${API}/${id}`)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      });
  };

  return (
    <div className="page">
      <h2>Task Tracker</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Task Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={e => setForm({ ...form, dueDate: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          required
        >
          <option value="">Select Status</option>
          <option value="To Do">📝 To Do</option>
          <option value="In Progress">🔄 In Progress</option>
          <option value="Done">✅ Done</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <h3 style={{ marginTop: '2rem' }}>My Tasks</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{
            background: '#2b3a55',
            padding: '1rem',
            borderRadius: '6px',
            marginBottom: '0.75rem',
            position: 'relative'
          }}>
            <strong>{task.title}</strong><br />
            Due: {task.dueDate}<br />
            Status: {task.status}
            <button
              onClick={() => handleDelete(task.id)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
                background: '#dc2626',
                padding: '0.3rem 0.7rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;

