const express = require('express');
const router = express.Router();
const Article = require('./models/Article');

// Route for creating a new article
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = new Article({ title, content });
    await article.save();
    res.status(201).json({ message: 'Article created successfully', article });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the article' });
  }
});

// Route for searching articles
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const articles = await Article.find({ $text: { $search: query } });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching articles' });
  }
});

module.exports = router;