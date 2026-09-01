# Appointments Practice

Appointments Practice is a Rails 8 JSON API with a Vite, React, and TypeScript
frontend. The API is served on port `3004` in Docker; the frontend runs independently
with Vite.

## Requirements

- Docker and Docker Compose for the recommended backend setup
- Node.js and npm for the frontend
- Ruby `3.4` and PostgreSQL only when running Rails outside Docker

## Start the application

Start Rails, PostgreSQL, Redis, and Sidekiq:

```sh
docker compose up --build
```

In another terminal, install and run the frontend:

```sh
npm ci --prefix frontend
npm run dev --prefix frontend
```

The frontend expects the API at `http://localhost:3004/api/v1`.

For a local Ruby setup, start PostgreSQL and Redis first, then run:

```sh
bin/setup
bin/dev
```

Database connection defaults are documented in `config/database.yml`.

## Verification

```sh
# Rails tests and checks
bin/rails test
bin/rubocop
bin/ci

# React lint, typecheck, and production build
npm run check --prefix frontend
```

`bin/ci` runs the Rails test suite, style checks, dependency audits, Brakeman, and the
frontend quality check. It requires the app's local services to be available.

## Project layout

- `app/controllers/api/v1/` — Rails API endpoints
- `app/models/` — persistence and domain behavior
- `test/` — Rails tests
- `frontend/src/api/` — frontend API client
- `frontend/src/components/` — React UI
- `frontend/src/types/` — shared frontend API types

## Agent guidance

Repository conventions live in [AGENTS.md](AGENTS.md). The frontend adds its own
[instructions](frontend/AGENTS.md). Claude Code reads [CLAUDE.md](CLAUDE.md), which
imports the shared guidance.
