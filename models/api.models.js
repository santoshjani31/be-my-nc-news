const db = require('../db/connection');

exports.fetchApiTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticleById = (article_id) => {
  const queryStr = `
    SELECT 
      articles.*,
      COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`;

  return db.query(queryStr, [article_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'Article not found' });
    }
    return rows[0];
  });
};

exports.fetchArticles = (sort_by = 'created_at', order = 'desc', topic) => {
  const validSortColumns = [
    'author',
    'title',
    'article_id',
    'topic',
    'created_at',
    'votes',
    'comment_count',
  ];
  const validOrders = ['asc', 'desc'];

  if (!validSortColumns.includes(sort_by) || !validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: 'Invalid sort or order query' });
  }

  const queryValues = [];
  let queryStr = `
    SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url,
      COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id`;

  if (topic) {
    queryStr += ` WHERE articles.topic = $1`;
    queryValues.push(topic);
  }

  queryStr += `
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};`;

  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (topic && rows.length === 0) {
      return db
        .query('SELECT * FROM topics WHERE slug = $1;', [topic])
        .then(({ rows: topics }) => {
          if (topics.length === 0) {
            return Promise.reject({ status: 404, msg: 'Topic not found' });
          }
          return [];
        });
    }
    return rows;
  });
};

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `
      SELECT 
        comment_id,
        votes,
        created_at,
        author,
        body,
        article_id
      FROM comments
      WHERE article_id = $1
      ORDER BY created_at DESC;
      `,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return db
          .query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
          .then(({ rows: articles }) => {
            if (articles.length === 0) {
              return Promise.reject({ status: 404, msg: 'Article not found' });
            }
            return [];
          });
      }
      return rows;
    });
};

exports.insertCommentByArticleId = (article_id, username, body) => {
  if (!username || !body) {
    return Promise.reject({ status: 400, msg: 'Missing parameters' });
  }

  return db
    .query(
      `
      INSERT INTO comments (article_id, author, body, created_at, votes)
      VALUES ($1, $2, $3, NOW(), 0)
      RETURNING comment_id, article_id, author, body, created_at, votes;
      `,
      [article_id, username, body]
    )
    .then(({ rows }) => rows[0])
    .catch((err) => {
      if (err.code === '23503') {
        return Promise.reject({
          status: 404,
          msg: 'Article not found',
        });
      }
      throw err;
    });
};

exports.updatedArticlesById = (article_id, inc_votes) => {
  if (!inc_votes) {
    return Promise.reject({ status: 400, msg: 'Missing parameters' });
  }
  return db
    .query(
      `
      UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;
    `,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'Article not found' });
      }
      return rows;
    });
};

exports.removeCommentById = (comment_id) => {
  return db
    .query(` DELETE FROM comments WHERE comment_id = $1 RETURNING *; `, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'Comment not found' });
      }
    });
};

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchUserByUsername = async (username) => {
  const query = `
    SELECT username, avatar_url, name
    FROM users
    WHERE username = $1;
  `;
  const result = await db.query(query, [username]);

  return result.rows[0]; // Will return undefined if no user found
};
