import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [summary, setSummary] = useState({
    hours: 0,
    tasks: { total: 0, done: 0 },
    lastMeeting: '',
    lastMilestone: '',
    openIssues: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [logs, tasks, meetings, research, issues] = await Promise.all([
          axios.get(import.meta.env.VITE_API_BASE + '/api/timelogs'),
          axios.get(import.meta.env.VITE_API_BASE + '/api/tasks'),
          axios.get(import.meta.env.VITE_API_BASE + '/api/meetings'),
          axios.get(import.meta.env.VITE_API_BASE + '/api/research'),
          axios.get(import.meta.env.VITE_API_BASE + '/api/issues'),
        ]);

        const totalHours = logs.data.reduce((sum, l) => sum + Number(l.hours), 0);
        const doneTasks = tasks.data.filter(t => t.status === 'Done').length;
        const lastMeeting = meetings.data.at(-1)?.date || 'N/A';
        const lastMilestone = research.data.at(-1)?.milestone || 'N/A';
        const openIssues = issues.data.filter(i => i.status === 'Open').length;

        setSummary({
          hours: totalHours,
          tasks: { total: tasks.data.length, done: doneTasks },
          lastMeeting,
          lastMilestone,
          openIssues,
        });
      } catch (err) {
        console.error('Failed to load dashboard summary:', err);
      }
    };

    loadData();
  }, []);

  return (
    <section style={{
      background: 'linear-gradient(to right, #1e293b, #111827)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="page" style={{
        background: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '12px',
        padding: '2rem',
        color: 'white'
      }}>
        <h2>📊 Dashboard Summary</h2>
        <ul style={{ lineHeight: '2rem', fontSize: '1.1rem' }}>
          <li>⏱ Total Hours Logged: <strong>{summary.hours}</strong></li>
          <li>📋 Tasks: <strong>{summary.tasks.total}</strong> (✅ {summary.tasks.done} done)</li>
          <li>📅 Last Meeting: <strong>{summary.lastMeeting}</strong></li>
          <li>🧠 Last Research Milestone: <strong>{summary.lastMilestone}</strong></li>
          <li>⚠️ Open Issues: <strong>{summary.openIssues}</strong></li>
        </ul>
      </div>
    </section>
  );
}

export default Dashboard;
