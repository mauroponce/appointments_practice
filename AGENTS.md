# App development guide

This repository contains a Rails 8 JSON API and a separate Vite + React + TypeScript
frontend in `frontend/`. Follow the nearest `AGENTS.md`; more-specific instructions
supplement this file.

## Before changing code

- Read the affected models, controllers, routes, tests, and frontend API client first.
- Follow established project patterns; do not introduce a new framework, library, or
  architectural layer unless the task requires it.
- Use project commands (`bin/rails`, `bin/ci`, and `npm --prefix frontend run …`),
  never globally installed Rails or Bundler commands.
- Keep changes small, focused, and covered by tests.

## Rails API

- Keep controllers focused on HTTP concerns. Put domain behavior in the model or a
  clearly named application object only when it does not belong there.
- Use RESTful routes and strong parameters. Scope every account-owned record through
  `current_account`; never use an unscoped lookup for tenant data.
- For schema changes, write reversible migrations and add appropriate database
  constraints and indexes.
- Preserve the API contract. When an endpoint response or validation changes, update
  its request/controller tests and the React client/types together.
- Do not log secrets, credentials, or sensitive customer information.

## Frontend

- The frontend is Vite + React, not Rails Hotwire. Follow `frontend/AGENTS.md` for
  component, state, accessibility, and TypeScript conventions.
- Keep server URLs and client-visible configuration explicit; never expose server-only
  credentials to browser code.

## Verification

- Run the narrowest relevant test first, then the applicable quality checks before
  handoff.
- Rails: `bin/rails test`, `bin/rubocop`, and relevant security checks.
- Frontend: `npm --prefix frontend run check`.
- Run `bin/ci` before handing off cross-cutting or release-ready changes when the
  local services are available.

## Handoff

- State what changed, which commands passed, and any assumptions or follow-up work.

## Documentation

- For framework, library, SDK, CLI, or API-specific questions, use the Context7 MCP
  connection before web search.
- Prefer documentation from the official or primary source returned by Context7.
- Use web search only when Context7 cannot provide the needed documentation, or for
  non-library information such as incidents, product announcements, or third-party
  service status.
- Do not use documentation lookup for routine refactors or code changes that can be
  understood from the repository itself.
