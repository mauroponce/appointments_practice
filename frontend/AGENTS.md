# React frontend guide

This directory is a Vite + React 19 + TypeScript application that consumes the Rails
API. These instructions supplement the repository `AGENTS.md`.

## Before changing code

- Inspect nearby components, types, API modules, and package scripts first.
- Preserve the existing React Router, TanStack Query, ESLint, and CSS approach.
- Do not add a dependency, UI kit, state library, or styling system unless the task
  requires it.

## React and data

- Prefer function components and hooks. Keep state local and minimal; derive values
  during render instead of duplicating them in state.
- Use effects only to synchronize with external systems such as browser APIs or
  subscriptions. Keep data fetching and caching in the existing TanStack Query layer.
- Model API responses in `src/types/` and centralize requests in `src/api/`.
- Represent loading, error, empty, and success states deliberately.
- When an API contract changes, update the Rails endpoint, client function, TypeScript
  types, and UI together.

## UI and accessibility

- Reuse existing components and CSS patterns before introducing new abstractions.
- Prefer semantic HTML and native controls. Provide labels, keyboard operation, visible
  focus styles, and useful loading/error messages.
- Do not use clickable `div`s where a native button, link, or form control fits.

## TypeScript and quality

- Keep TypeScript strict: avoid `any`, unjustified casts, and suppressed errors.
- Add or update focused tests when a test setup exists; do not add a test framework
  solely for a small change without discussing it.
- Verify with `npm run check` from this directory (or
  `npm --prefix frontend run check` from the repository root).
