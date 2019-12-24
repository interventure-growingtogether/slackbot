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
  const { id } = req.params;
  const { link, tags } = req.body;
  try {
    console.debug(`Updating article ${id}...`);
    const result = await updateArticle(id, tags, link);
    console.debug(`Article ${id} updated successfully.`);
    res.json(result);
  } catch (err) {
    console.error(`Article ${id} update failed!`);
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id/accept', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Accepting article ${id}...`);
    const result = await acceptArticle(id);
    console.debug(`Article ${id} accepted`);
    res.json(result);
  } catch (err) {
    console.error(`Accept article ${id} failed with error!`);
    console.error(err);
    res.status(500).json(err);
  }
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
