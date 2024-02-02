const express = require('express');

const router = express.Router();
const thaiWords = require('../data/thaiWords');

router.get('/', (req, res) => {
  res.json(thaiWords);
});

module.exports = router;
