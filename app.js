const express = require('express');
const {
  getApi,
  getApiTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticlesById,
  deleteCommentById,
} = require('./controllers/api.controller');
const {
  postgresErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require('./error-handlers');
const app = express();

app.use(express.json());

app.get('/api', getApi);

app.get('/api/topics', getApiTopics);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.patch('/api/articles/:article_id', patchArticlesById);

app.delete('/api/comments/:comment_id', deleteCommentById);

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
