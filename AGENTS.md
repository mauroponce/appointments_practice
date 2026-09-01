# Rails conventions

## Before changing code
- Read the relevant models, tests, routes, and existing patterns first.
- Follow existing project conventions when they differ from this file.
- Use `bin/` commands, never global Rails/Bundler commands.

## Application design
- Prefer conventional Rails: RESTful routes, resource-oriented controllers, Active Record,
  Active Job, and Action Mailer.
- Keep controllers focused on HTTP concerns; put domain behavior near the model or in a
  clearly named application object when it does not belong there.
- Use Hotwire (Turbo and Stimulus) for interactive UI unless this project already uses
  another frontend approach.
- Avoid new gems or broad refactors unless the task calls for them.

## Data and security
- Write reversible, safe migrations and add appropriate database constraints and indexes.
- Authorize every sensitive action using the project’s existing authorization approach.
- Do not expose secrets, credentials, or internal data in logs or error messages.

## Quality
- Add or update tests for behavior changes.
- Run the narrowest relevant test first, then the project’s standard checks before handoff.
- Preserve accessibility, responsive behavior, and server-rendered fallback where relevant.