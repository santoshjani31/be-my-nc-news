const endpointsJson = require('../endpoints.json');
const { fetchApiTopics, fetchArticleById } = require('../models/api.models');
const { checkArticleExist } = require('../models/articles.models');

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
};

exports.getApiTopics = (req, res, next) => {
  fetchApiTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [fetchArticleById(article_id)];

  if (article_id) {
    promises.push(checkArticleExist(article_id));
  }

  Promise.all(promises)
    .then((articleRes) => {
      res.status(200).send({ articles: articleRes[0] });
    })
    .catch(next);
};
