const articleRouter = require('./api/article');
const eventRouter = require('./api/event');

module.exports = app => {
  app.use('/api/articles', articleRouter);
  app.use('/api/events', eventRouter);
  app.get('/ping', (req, res) => res.send({ ping: 'pong'}));
};
