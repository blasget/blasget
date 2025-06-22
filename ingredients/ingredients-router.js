const router = require("express").Router();

router.get('/ingredients', (_req, res) => res.send('Hi'));

module.exports = router