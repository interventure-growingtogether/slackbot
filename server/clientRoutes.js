const { Router } = require('express');


module.exports = (app) => {
  const router = Router();

  router.get('/', (req, res) => app.render(req, res, '/'));

  router.get('/ops', (req, res) => app.render(req, res, '/ops'));

  return router;
};
