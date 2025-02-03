// server/index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
app.use(express.json());
app.use(cors());

// Get all posts
app.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get post by ID
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM posts WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(result[0]);
  });
});

// Create a new post
app.post('/posts', (req, res) => {
  const { title, author, category, tags, likes } = req.body;
  if (!title || !author || !category || !tags) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  db.query(
    'INSERT INTO posts (title, author, category, tags, likes) VALUES (?, ?, ?, ?, ?)',
    [title, author, category, JSON.stringify(tags), likes || 0],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Post added', id: result.insertId });
    }
  );
});

// Update a post
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, category, tags, likes } = req.body;
  db.query(
    'UPDATE posts SET title = ?, author = ?, category = ?, tags = ?, likes = ? WHERE id = ?',
    [title, author, category, JSON.stringify(tags), likes, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Post not found' });
      res.json({ message: 'Post updated' });
    }
  );
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));