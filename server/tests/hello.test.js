const request = require('supertest');
const express = require('express');
const app = express();

// Simulate your actual backend route
app.get('/api/hello', (req, res) => {
  res.send('Hello from Backend!');
});

describe('GET /api/hello', () => {
  it('should return hello message', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello from Backend!');
  });

  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toBe(404);
  });
});
