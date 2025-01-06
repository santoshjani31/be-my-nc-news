const express = require('express');
const cors = require('cors');
const {
  getApi,
  getApiTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticlesById,
  deleteCommentById,
  getUsers,
  getUserByUsername,
} = require('./controllers/api.controller');
const {
  postgresErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require('./error-handlers');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api', getApi);

app.get('/api/topics', getApiTopics);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.patch('/api/articles/:article_id', patchArticlesById);

app.delete('/api/comments/:comment_id', deleteCommentById);

app.get('/api/users', getUsers);

app.get('/api/users/:username', getUserByUsername);

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
