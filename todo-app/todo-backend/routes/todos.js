const express = require('express');
const { Todo } = require('../mongo');
const { setAsync, getAsync } = require('../redis');

const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const counter = Number(await getAsync('added_todos')) || 0;
  await setAsync('added_todos', counter + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.todo = await Todo.findById(id);
    if (!req.todo) return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }

  return next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.status(200).send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    const { text, done } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.todo._id },
      { text, done },
      { new: true },
    );

    res.status(200).send(updatedTodo);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
