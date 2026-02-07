const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/auth/login', (req, res) => {
  console.log('Login endpoint hit:', req.body);
  res.json({ message: 'Login endpoint working', body: req.body });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Test at: http://localhost:${PORT}/test`);
});