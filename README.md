***Status: WIP / under development***

# Demo Session Toolkit

Build online demos where every visitor gets an isolated session automatically.

No sign-up flow, no shared-state conflicts, and no manual cleanup headaches.

## Why this exists

When multiple users test the same demo environment, they can overwrite each other's data.
This toolkit isolates each user at the database level so everyone gets a clean, independent experience.

## How it works

Session isolation is based on a unique `sessionId`:

1. The frontend receives a session cookie.
2. The backend writes data tagged with that `sessionId`.
3. Read queries automatically return only records that match the current `sessionId`.
4. A scheduled cleanup job deletes expired demo data.

Result: each visitor can test your app safely without affecting others.

## What is handled automatically

- Session isolation through cookies
- Automatic write/read filtering by `sessionId`
- Periodic cleanup of stale demo records

## What you need to implement

- Frontend
    - Send requests with credentials enabled (cookies)
- Backend (depends on [your stacks](#available-backends))
    - Integrate the session filter middleware/mechanism
    - Define first-visit behavior (for example: seed initial demo data)
- Database
    - Slightly adapt your table definitions to support session-scoped records (varies by RDBMS)

## Available backends

- [Express](link)

## Supported RDBMS

- [PostgreSQL](link)

## [TODO] Recommended README media

To make this project easier to understand at a glance, add visual assets:

1. Architecture diagram (PNG/SVG)
     - Show: Browser -> Backend -> Database, with `sessionId` flow.
2. Quick demo GIF (10-20s)
     - Show two browser windows creating data without collisions.

Suggested structure in the repository:

```text
docs/
    images/
        architecture.png
        before-after.png
    gifs/
        session-isolation-demo.gif
```

Then embed them in this README (update paths if needed):

```markdown
## Visual Overview

![Architecture](docs/images/architecture.png)

![Session Isolation Demo](docs/gifs/session-isolation-demo.gif)
```
