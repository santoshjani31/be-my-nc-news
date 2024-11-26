const express = require('express');
const {
  getApi,
  getApiTopics,
  getArticleById,
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

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
