// require app and request
const app = require('../app');
const request = require('supertest');
//endpoints data to assert GET /api response body against
const endpointsJson = require('../endpoints.json');
// data and seedfor seeding  test database before each test
const testData = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');
// database connection pool for ending connection after tests run
const db = require('../db/connection');

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe('GET /api', () => {
  test('200: Responds with an object detailing the documentation for each endpoint', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe('GET /api/topics', () => {
  test('200: Responds with an array of topic objects, each with properties: slug, description', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toBeInstanceOf(Array);
        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            })
          );
        });
      });
  });
});

describe('GET /api/articles/:article_id', () => {
  test('200: Responds with an article object with all relevant properties ', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body }) => {
        //console.log(body, '<<< inside test');
        expect(body.articles).toBeInstanceOf(Array);
        body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: 1,
              body: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
            })
          );
        });
      });
  });
  test('400: responds with Invalid input format for invalid article_id', () => {
    return request(app)
      .get('/api/articles/notNumber')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid input format');
      });
  });
  test('404: responds with Article not found for non-existent article_id', () => {
    return request(app)
      .get('/api/articles/99999')
      .expect(404)
      .then(({ body }) => {
        console.log(body.msg);
        expect(body.msg).toBe('not found');
      });
  });
});
