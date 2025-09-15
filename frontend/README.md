# Frontend - User Management Dashboard

## Quick start

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Start dev server:
   ```
   npm run dev
   ```

3. By default the frontend expects the API at `http://localhost:4000/api`.
   You can set `VITE_API_URL` in `.env` at frontend root (e.g. `VITE_API_URL=http://localhost:4000/api`).


Features added:
- Edit user page at /users/:id/edit
- Google Maps link on user details when geo coordinates are present
