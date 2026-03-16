# Book Ratings and Reviews API

A small RESTful API for managing books, ratings, and reviews. It uses Express and JWT for authentication and is documented with Swagger.

## Features
- User registration and login (JWT authentication)
- List all books (public)
- Add a book (auth required)
- Get reviews for a book (public)
- Add a review with a rating between 1–10 (auth required)
- Delete a review (auth required, only the review owner)
- In-memory data storage (no external database)
- Swagger API documentation at `/api-docs`

## Project structure
```
model/         # In-memory data models (users, books, reviews)
service/       # Business logic for users, books, reviews
controllers/   # Request handlers for each resource
routes/        # Express route definitions
middleware/    # JWT authentication middleware
resources/     # Swagger YAML documentation (swagger.yaml)
app.js         # Main Express application and route mounting
README.md      # This file
```

## Environment / .env
This project looks for the following environment variables (optional):

- `PORT` — port the server listens on (default: `3000`).
- `JWT_SECRET` — secret used to sign JWT tokens. If not provided the app falls back to a built-in default; for any real deployment set this to a strong secret.
- `BASE_URL` — base URL for the running API (used by clients or tooling). Defaults to `http://localhost:3000` when not provided.

Create a `.env` file in the project root if you want to override these values, for example:

```env
PORT=3000
JWT_SECRET=supersecretkey
```

Note: the current code uses an in-memory store and a hardcoded fallback secret. Using `.env` and a real database is recommended for production.

## Getting started
1. Install dependencies:
```bash
npm install
```
2. Start the server:
```bash
node app.js
```
3. The API will be available at `http://localhost:3000/` (or your configured `PORT`).
4. Swagger UI is available at `http://localhost:3000/api-docs`.

## Sample / pre-populated data
To make testing easier the repository comes with pre-populated in-memory data (see `model/`):

- Users:
  - `alice` — password: `password123`
  - `bob` — password: `mysecurepass`

- Books and reviews: three books are pre-added, each with a few sample reviews.

These users are present only in memory and will be reset when the server restarts.

## Routes and auth summary
- `POST /register` — register new user (public)
- `POST /login` — login and receive JWT token (public)
- `GET /books` — list all books (public)
- `POST /books` — add a new book (requires Authorization: Bearer <token>)
- `GET /books/:bookId/reviews` — list reviews for a book (public)
- `POST /books/:bookId/reviews` — add review to a book (requires auth)
- `DELETE /reviews/:reviewId` — delete a review (requires auth; only owner allowed)

When calling protected endpoints include the JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## API documentation
Full request/response models, status codes and examples are provided in `resources/swagger.yaml` and rendered at `/api-docs`.

## Troubleshooting
- If you get `401 Invalid credentials` when logging in with the pre-populated users, ensure you are using the exact username and password listed above.
- If `POST /books/:bookId/reviews` returns 404, ensure the server mounts the review routes under `/books` (route path should be `/books/:bookId/reviews`).

## Notes
- This project is intentionally simple: data is stored in memory for demo and testing purposes only. Restarting the server clears all runtime state.
- For production use replace the in-memory stores with a persistent database and move secrets to environment variables or a secrets manager.

---

**Author:** DiasLuc
