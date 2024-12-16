# Northcoders News API

For instructions, please head over to [L2C NC News].
You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

Start
Northcoders News API README
Overview
Northcoders News API is a backend project designed to simulate a real-world API service, similar to platforms like Reddit. It allows developers to programmatically access and manipulate data related to articles, comments, users, and topics.

This project utilizes PostgreSQL for the database and Node.js with the node-postgres library to interact with the database.

Hosted Version
Click here to access the live version of the API
(Replace # with the actual link to your hosted API.)

Core Functionality
This API provides the following endpoints:

GET /api/topics: Retrieves a list of all topics.
GET /api: Provides a list of all available endpoints.
GET /api/articles/:article_id: Fetches a single article by its ID, including a comment_count.
GET /api/articles: Returns a list of articles, with optional sorting and filtering queries.
GET /api/articles/:article_id/comments: Fetches all comments associated with a specific article.
POST /api/articles/:article_id/comments: Adds a comment to a specific article.
PATCH /api/articles/:article_id: Updates the vote count of a specific article.
DELETE /api/comments/:comment_id: Deletes a comment by its ID.
GET /api/users: Returns a list of all users.
Setup Instructions
Clone the Repository
To get started, clone the project to your local machine:

bash
Copy code
git clone https://github.com/your-username/northcoders-news-api.git
cd northcoders-news-api
Install Dependencies
Run the following command to install all required dependencies:

bash
Copy code
npm install
Environment Configuration
You need to create two .env files in the root directory:

.env.test
.env.development
These files should define the database URL for your PostgreSQL instance. Example:

makefile
Copy code
PGDATABASE=your_database_name
Ensure your test database and development database are configured correctly in these files.

Database Setup
To set up the database schema and seed it with test data, run the following commands:

bash
Copy code
npm run setup-dbs
npm run seed
Run Tests
To verify that everything is working as expected, run the test suite:

bash
Copy code
npm test
Minimum Requirements
Node.js: v16.0.0 or higher
PostgreSQL: v12.0 or higher
Project Workflow
Create a new branch for each feature using:
bash
Copy code
git checkout -b <branch-name>
Push your branch to GitHub:
bash
Copy code
git push origin <branch-name>
Make a pull request (PR) for code review.
Once merged, switch back to main and pull the latest changes:
bash
Copy code
git checkout main
git pull origin main
Additional Notes
This project uses Husky to enforce code quality by running pre-commit hooks. Tests must pass before commits are allowed.

For more details about the project or to contribute, please contact the repository maintainer.

Let me know if you’d like any adjustments or if this is ready to be committed!
https://dashboard.render.com/web/srv-ct45jeogph6c73c4nn70/logs
https://be-my-nc-news.onrender.com
https://supabase.com/dashboard/project/vowknflbnwjarhmwphwr/editor/29245?schema=public
https://github.com/santoshjani31/be-my-nc-news/pull/10
https://github.com/santoshjani31/be-my-nc-news/pull/11
https://github.com/santoshjani31/be-my-nc-news/pull/12

End 29/11/24 16:18

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
