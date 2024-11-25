const express = require('express');
const { getApi, getApiTopics } = require('./controllers/api.controller');
const app = express();

app.get('/api', getApi);

app.get('/api/topics', getApiTopics);

// https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
  // error handling from johns recap session
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad Request' });
  } else {
    res
      .status(err.status || 500)
      .send({ msg: err.msg || 'Internal Server Error' });
  }
});

module.exports = app;
