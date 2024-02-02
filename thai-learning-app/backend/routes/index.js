const express = require('express');

const router = express.Router();
const thaiWords = require('../data/thaiWords');

let visits = 0;
const numberOfWords = thaiWords.length;

router.get('/', async (req, res) => {
  visits++;

  res.send({
    visits,
    numberOfWords,
  });
});

module.exports = router;
