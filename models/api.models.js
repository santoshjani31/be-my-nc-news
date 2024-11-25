const db = require('../db/connection');

exports.fetchApiTopics = () => {
  return db.query(`select * from topics;`).then(({ rows }) => {
    //console.log(rows);
    return rows;
  });
};
