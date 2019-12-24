const articleRouter = require('./api/article');

module.exports = app => {
  app.use('/api/articles', articleRouter);
  app.get('/ping', (req, res) => res.send({ ping: 'pong'}));
};
