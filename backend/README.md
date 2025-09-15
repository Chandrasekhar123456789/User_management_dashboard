# Backend - User Management API (Sequelize)

This backend uses Sequelize ORM. By default it uses SQLite for simplicity.
You can switch to Postgres by setting DB_DIALECT=postgres and providing DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS.

Quick start (SQLite):
1. Install dependencies:
   ```
   cd backend
   npm install
   ```
2. Run seed (creates sample users in db.sqlite):
   ```
   npm run seed
   ```
3. Start server:
   ```
   npm run dev
   ```

Quick start (Postgres):
- Create a Postgres DB and user.
- Set env variables in a `.env` file:
  ```
  DB_DIALECT=postgres
  DB_HOST=...
  DB_PORT=5432
  DB_NAME=...
  DB_USER=...
  DB_PASS=...
  PORT=4000
  ```
- Install deps and run as above.

API endpoints:
- GET /api/users
- GET /api/users/:id
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id
