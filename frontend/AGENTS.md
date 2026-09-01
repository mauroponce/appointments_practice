# Frontend conventions

## Before changing code
- Inspect the nearest components, tests, package scripts, and existing patterns first.
- Preserve the existing framework, router, state-management, styling, and component-library choices.
- Do not introduce a new dependency or UI framework unless the task requires it.

## React
- Prefer function components and hooks.
- Keep state local and minimal; derive values during render instead of synchronizing redundant state with effects.
- Use effects only for synchronizing with external systems (network, browser APIs, subscriptions, etc.).
- Extract a custom hook only when behavior is genuinely reused or meaningfully simplifies the component.
- Keep components focused; split only when it improves clarity or reuse.

## UI and accessibility
- Reuse existing design tokens, primitives, and shared components.
- Use semantic HTML first; provide labels, keyboard support, visible focus states, and meaningful loading/error/empty states.
- Do not use clickable `div`s when a `button`, `a`, `input`, or other native control is appropriate.
- Avoid hard-coded colors, spacing, breakpoints, and z-index values when project tokens exist.

## Data and forms
- Follow the existing data-fetching and caching approach.
- Treat async states explicitly: loading, error, empty, and success.
- Validate forms on both client and server when applicable; display actionable field-level errors.
- Do not expose server-only environment variables or secrets in client code.

## Quality
- Update or add focused tests for changed behavior.
- Run the narrowest relevant test, typecheck, lint, and build commands defined by this project.
- Keep TypeScript strict: avoid `any`, unsafe casts, and suppressed errors unless justified locally.