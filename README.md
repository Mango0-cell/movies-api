# 🎬 Movies API

A production-grade REST API that acts as a secure proxy for [The Movie Database (TMDb)](https://www.themoviedb.org/) API. Browse movies, TV shows, people, and trending content — all through a clean, well-documented interface that keeps your API keys safe on the server.

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

- **🔒 Secure** — TMDb API key never leaves the server. Helmet, CORS, and rate limiting built-in.
- **📖 Self-Documented** — Interactive Swagger UI at `/api/docs`.
- **✅ Validated** — Every request validated with Zod schemas before reaching your controllers.
- **🧪 Tested** — Integration test suite with Vitest + Supertest.
- **🏗️ Clean Architecture** — Layered design: Routes → Controllers → Services → TMDb API.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| ------ | ----------------------- | -------------------------------- |
| GET | `/api/movies` | List & filter movies |
| GET | `/api/movies/:id` | Get movie details |
| GET | `/api/tv` | List & filter TV shows |
| GET | `/api/tv/:id` | Get TV show details |
| GET | `/api/people` | Search people |
| GET | `/api/people/:id` | Get person details |
| GET | `/api/trending/:type` | Get trending (movie, tv, person) |

> Full request/response schemas available at **`/api/docs`** once the server is running.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- A [TMDb API](https://developer.themoviedb.org/) access token (free)

### Installation

```bash
# Clone the repository
git clone https://github.com/Mango0-cell/movies-api.git
cd movies-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Open `.env` and paste your TMDb access token:

```env
TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
```

### Run the Server

```bash
# Development (hot reload)
npm run dev

# Production
npm run build
npm start
```

The API will be available at **`http://localhost:3000`**.

---

## 📋 Environment Variables

| Variable | Default | Description |
| -------------------- | -------------------------------- | ------------------------------ |
| `TMDB_ACCESS_TOKEN` | — | **Required.** Your TMDb token |
| `TMDB_BASE_URL` | `https://api.themoviedb.org/3` | TMDb API base URL |
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | `development` / `production` / `test` |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed CORS origin |
| `RATE_LIMIT_WINDOW_MS`| `900000` | Rate limit window (ms) |
| `RATE_LIMIT_MAX` | `100` | Max requests per window |

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run only integration tests
npm run test:int
```

---

## 🛠️ Scripts

| Command | Description |
| ---------------- | ---------------------------------- |
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled JS in production |
| `npm test` | Run all tests |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |

---

## 🏛️ Project Structure

```
src/
├── config/          # Environment config & validation
├── controllers/     # Request handlers (parse input, call service, respond)
├── docs/            # Swagger/OpenAPI spec
├── middleware/       # Error handling, validation, rate limiting, logging
├── routes/          # Express route definitions
├── services/        # Business logic & TMDb API calls
├── types/           # TypeScript type definitions
├── utils/           # Helpers (AppError, logger)
├── validators/      # Zod request validation schemas
├── app.ts           # Express app setup
└── index.ts         # Server entry point

tests/
├── helpers/         # Test setup & utilities
└── integration/     # API endpoint tests
```

---

## 📬 Postman

A Postman collection is included in the `postman/` directory. Import it into Postman to quickly test all endpoints.

