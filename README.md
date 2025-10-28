# Book Ratings and Reviews API

A RESTful API for managing books, ratings, and reviews with JWT authentication, built with Express and documented using Swagger.

## Features
- User registration and login (JWT authentication)
- List all books (public)
- Add a book (auth required)
- Get reviews for a book (public)
- Add a review with a rating between 1-10 (auth required)
- Delete a review (auth required, only own reviews)
- In-memory data storage (no external database)
- Swagger API documentation at `/api-docs`

## Project Structure
```
model/         # In-memory data models (User, Book, Review)
service/       # Business logic for users, books, reviews
controllers/   # Request handlers for each resource
routes/        # Express route definitions
middleware/    # JWT authentication middleware
resources/     # Swagger YAML documentation
app.js         # Main Express app
```

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   node app.js
   ```
3. Access the API at `http://localhost:3000/`
4. View Swagger docs at `http://localhost:3000/api-docs`

## API Endpoints
See the [Swagger documentation](./resources/swagger.yaml) for full details on endpoints, request/response models, and error codes.

## Authentication
- Register via `POST /register` with a username and password.
- Login via `POST /login` to receive a JWT token.
- For protected endpoints, include the token in the `Authorization` header as `Bearer <token>`.

## Notes
- All data is stored in memory and will reset when the server restarts.
- Users can only delete their own reviews.

---

**Author:** DiasLuc
