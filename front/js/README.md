# Demo Session Toolkit - Front JS

Small frontend JavaScript module that automatically adds a session identifier to HTTP requests.

Goal: each visitor keeps a local `sessionId` (in `localStorage`) and sends it in the `X-Session-Id` header.
The backend can then isolate data however you prefer.

If you want a ready-to-use backend integration example, see the full toolkit: https://github.com/emmy-villard/demo-session-toolkit

This package does not enforce any backend architecture: it only handles the frontend part.

## What This Module Does

- Generates a unique session identifier in the browser.
- Reuses the same identifier as long as it exists in `localStorage`.
- Injects (or overwrites) the `X-Session-Id` header on a `Request` object.

Exported API:

- `getUniqueSessionId(): string`
- `injectSessionHeader(request: Request): Request`
- `sessionFetch(input, init?): Promise<Response>`

> [!WARNING]
> `injectSessionHeader` mutates the provided `Request` instance by side effect.
> It does not create a copy; it returns the same object reference.

## Installation

### Option 1: With npm

```bash
npm install demo-session-toolkit-js
```

Then in your code:

```js
import { injectSessionHeader, getUniqueSessionId, sessionFetch } from 'demo-session-toolkit-js'
```

### Option 2: Without npm (use as-is)

If you do not want to rely on npm, simply copy the `injectSessionHeader/` folder into your frontend project.

Example structure:

```txt
src/
  session/
    getUniqueSessionId.js
    injectSessionHeader.js
    sessionFetch.js
    index.js
```

Then import locally:

```js
import { injectSessionHeader, getUniqueSessionId } from './session/index.js'
```

## Quick Usage

```js
import { injectSessionHeader } from './session/index.js'

const postRequest = new Request('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Buy milk' })
})

injectSessionHeader(postRequest)
const response = await fetch(postRequest)
```

## Built-In Fetch Wrapper

```js
import { sessionFetch } from './session/index.js'

const response = await sessionFetch('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Buy milk' })
})
```

## Useful Details

- `localStorage` key used: `uniqueSessionId`.
- Header sent: `X-Session-Id`.
- If the header already exists, it is overwritten.
- The module mutates the provided `Request` object (no copy).

## Compatibility

Designed for browser environments with:

- `localStorage`
- `Request` / `Headers` / `fetch`

If you are in SSR/Node, use it on the client side only, or provide appropriate polyfills.

## Package Scope

This package intentionally stops at the frontend layer.
Backend strategy (validation, isolation, expiration, cleanup) remains fully open so each project can implement it as needed.

