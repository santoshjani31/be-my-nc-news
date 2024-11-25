const endpointsJson = require('../endpoints.json');
const { fetchApiTopics } = require('../models/api.models');

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
};

exports.getApiTopics = (req, res, next) => {
  return fetchApiTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next); // error handler
};

//module.exports = { getApi, getApiTopics };
