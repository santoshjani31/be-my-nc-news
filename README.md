# Northcoders News API

## Overview

Northcoders News API is a RESTful web service designed to mimic the backend of a real-world application like Reddit. It allows programmatic access to data stored in a PostgreSQL database, which is interacted with using `node-postgres`. This API provides endpoints for retrieving, creating, updating, and deleting resources related to articles, topics, users, and comments.

The application is hosted online using Render and connected to a Supabase-hosted PostgreSQL database.

## Getting Started

Follow the steps below to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Cloning the Repository

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/santoshjani31/be-my-nc-news.git
   cd be-my-nc-news
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Setting Up the Environment

You need to create two `.env` files to connect to your PostgreSQL databases for development and testing:

1. Create `.env.development`:

   ```
   PGDATABASE=nc_news
   ```

2. Create `.env.test`:
   ```
   PGDATABASE=nc_news_test
   ```

Ensure these files are included in the `.gitignore` to prevent them from being pushed to version control.

### Creating the Databases

To set up the databases:

1. Create the databases by running the following command:

   ```bash
   npm run setup-dbs
   ```

2. Seed the development database:
   ```bash
   npm run seed
   ```

### Running the Application Locally

Start the server:

```bash
npm start
```

The server will be running on `http://localhost:9090` by default.

### Running Tests

To run the test suite:

```bash
npm test
```

## Endpoints

### Base URL

- Local: `http://localhost:9090`
- Hosted: `https://be-my-nc-news.onrender.com`

### Available Endpoints

#### **GET /api**

- **Description**: Provides documentation of all available endpoints.
- **Response Example**:
  ```json
  {
    "endpoints": {
      "GET /api/topics": {
        "description": "Responds with a list of all topics.",
        "exampleResponse": {
          "topics": [
            { "slug": "coding", "description": "All about coding." },
            { "slug": "football", "description": "News about football." }
          ]
        }
      }
    }
  }
  ```

#### **GET /api/topics**

- **Description**: Retrieves all topics.
- **Response Example**:
  ```json
  {
    "topics": [
      { "slug": "coding", "description": "All about coding." },
      { "slug": "football", "description": "News about football." }
    ]
  }
  ```

#### **GET /api/articles/:article_id**

- **Description**: Retrieves a specific article by its ID.
- **Response Example**:
  ```json
  {
    "article": {
      "article_id": 1,
      "title": "The Rise of JavaScript",
      "author": "jessjelly",
      "body": "JavaScript is taking over the world...",
      "topic": "coding",
      "created_at": "2021-07-20T20:00:00.000Z",
      "votes": 100,
      "comment_count": 5,
      "article_img_url": "https://example.com/image.jpg"
    }
  }
  ```

#### **POST /api/articles/:article_id/comments**

- **Description**: Adds a comment to a specific article.
- **Request Body Example**:
  ```json
  {
    "username": "jessjelly",
    "body": "Great article!"
  }
  ```
- **Response Example**:
  ```json
  {
    "comment": {
      "comment_id": 14,
      "article_id": 1,
      "author": "jessjelly",
      "body": "Great article!",
      "created_at": "2025-01-06T12:00:00.000Z",
      "votes": 0
    }
  }
  ```

#### **PATCH /api/articles/:article_id**

- **Description**: Updates the votes for a specific article.
- **Request Body Example**:
  ```json
  {
    "inc_votes": 10
  }
  ```
- **Response Example**:
  ```json
  {
    "article": {
      "article_id": 1,
      "votes": 110
    }
  }
  ```

#### **DELETE /api/comments/:comment_id**

- **Description**: Deletes a specific comment by its ID.
- **Response**:
  - Status: `204 No Content`

For a complete list of endpoints, refer to the `/api` endpoint.

## Hosting

This API is hosted using:

- **Database**: [Supabase](https://supabase.com/)
- **Backend**: [Render](https://render.com/)

To deploy your version, you can follow the respective documentation for Supabase and Render.

## Contributions

If you wish to contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b <feature-name>
   ```
3. Make your changes and commit them.
4. Push your branch:
   ```bash
   git push origin <feature-name>
   ```
5. Open a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
