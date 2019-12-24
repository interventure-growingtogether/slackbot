const express = require('express');
const {
  getAllArticles,
  createNewArticle,
  updateArticle,
  deleteArticle,
  acceptArticle
} = require('./article.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.debug('Fetching all articles...');
    const result = await getAllArticles();
    console.debug('Fetch successful', result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const {
    link,
    tags
  } = req.body;

  try {
    console.debug(`Adding new article with link ${link} and tags ${tags}...`);
    const result = await createNewArticle(link, tags)
    console.debug('Article successfully added', result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  res.json('PUT successfull');
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.debug(`delete article with id ${id}`);
    const result = await deleteArticle(id);
    console.debug(`delete successful`, result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;
