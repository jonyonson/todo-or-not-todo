const express = require('express');
const helmet = require('helmet');

const usersRouter = require('../users/users-router');
const todosRouter = require('../todos/todos-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

server.use('/api/users', usersRouter);
server.use('/api/todos', todosRouter);

module.exports = server;
