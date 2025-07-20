const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let logs = [];
let tasks = [];
let meetings = [];
let research = [];
let issues = [];

app.get('/api/issues', (req, res) => {
  res.json(issues);
});

app.post('/api/issues', (req, res) => {
  const issue = req.body;
  issue.id = Date.now();
  issues.push(issue);
  res.status(201).json(issue);
});

app.get('/api/research', (req, res) => {
  res.json(research);
});

app.post('/api/research', (req, res) => {
  const entry = req.body;
  entry.id = Date.now();
  research.push(entry);
  res.status(201).json(entry);
});


app.get('/api/meetings', (req, res) => {
  res.json(meetings);
});

app.post('/api/meetings', (req, res) => {
  const meeting = req.body;
  meeting.id = Date.now();
  meetings.push(meeting);
  res.status(201).json(meeting);
});

app.get('/api/hello', (req, res) => {
  res.send('Hello from Backend!');
});

app.get('/api/timelogs', (req, res) => {
  res.json(logs);
});

app.post('/api/timelogs', (req, res) => {
  const log = req.body;
  log.id = Date.now();
  logs.push(log);
  res.status(201).json({ message: 'Log added', log });
});

// ✅ TASK ROUTES
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const task = req.body;
  task.id = Date.now();
  tasks.push(task);
  res.status(201).json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: 'Task deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
