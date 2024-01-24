const express = require('express');

const router = express.Router();

const { getAsync } = require('../redis');

router.get('/', async (_req, res) => {
  const counter = Number(await getAsync('added_todos')) || 0;
  res.json({ added_todos: counter });
});

module.exports = router;
