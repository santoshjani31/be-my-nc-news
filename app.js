const express = require('express');
const {
  getApi,
  getApiTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
} = require('./controllers/api.controller');
const {
  postgresErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require('./error-handlers');
const app = express();

app.get('/api', getApi);

app.get('/api/topics', getApiTopics);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
