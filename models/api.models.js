const db = require('../db/connection');

exports.fetchApiTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticleById = (article_id) => {
  let queryStr = 'SELECT * FROM articles';
  const queryValues = [];
  if (article_id) {
    queryStr += ' WHERE article_id = $1;';
    queryValues.push(article_id);
  }

  return db.query(queryStr, queryValues).then(({ rows }) => {
    return rows;
  });
};
