
# ✅ Lesson 1: Create a Basic Node Server

Welcome to Lesson 1 of the Node API Server Demo! In this foundational lesson, we built a raw Node.js server using only the built-in `http` module — no frameworks, no shortcuts — just clean, core JavaScript.

---

## 🛠️ What We Built

A basic HTTP server that:
- Listens on `localhost:3000`
- Responds with plain text at the root (`/`)
- Returns JSON data at the `/api` endpoint
- Sends a 404 message for unknown routes

---

## 📄 Full Code from Lesson 1

```js
const http = require('http');

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the homepage!');
  } else if (url === '/api' && method === 'GET') {
    const data = {
      message: 'Here is some JSON data',
      time: new Date().toISOString(),
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

---

## 🧠 Concepts Covered

### `http` module
- No `npm install` needed — it's built into Node.js
- Used to create and control an HTTP server

### `createServer((req, res) => { ... })`
- `req`: the incoming request object
- `res`: the outgoing response object

### Destructuring `req`
```js
const { url, method } = req;
```
Gives us quick access to the request path and HTTP method.

### Routing Logic
- `if (url === '/' && method === 'GET')` → homepage
- `else if (url === '/api' && method === 'GET')` → JSON endpoint
- `else` → catch-all 404 fallback

### Sending Responses
- `.writeHead(statusCode, headers)` to set HTTP status and headers
- `.end(data)` to finish the response and send data back
- You can also use `.write()` before `.end()` to stream multiple chunks

### `Content-Type` matters
- `text/plain` → plain text output
- `application/json` → structured, machine-readable JSON

---

## 🔀 Bonus Detours & Side Roads (a.k.a. Great Questions)

- 🧪 We logged request data like `req.method`, `req.url`, and `req.headers`
- 🧠 Learned about browser behavior with `/favicon.ico` (automatic extra request!)
- 🧰 Explored tools like `req.socket.remoteAddress` to get the user's IP address
- 💾 Used `fs.appendFile()` to hypothetically log those IPs to a `.txt` file
- ❓ Discussed whether `.txt` files could be `require()`'d — learned that `fs.readFile()` is the way
- 🌐 Introduced the concept of CORS: what it is, when it applies, and how to allow certain origins
- 🧵 Talked about separating data (like `banks.json`) from app code to support dynamic updates
- 🗂️ Started a conversation about documenting lessons in Markdown for long-term reference

---

## 🧱 Next Up: Lesson 2
**Serving JSON from a File with `fs.readFile()`**

We’ll simulate a basic backend API that serves data from a `.json` file, like a mock database.

You’ll learn:
- How to read files asynchronously with `fs.readFile()`
- How to respond to a route with real data
- Why this is useful for frontend/backend separation

➡️ [Go to Lesson 2](./02-serving-json-files.md)

---

**Always Be Kicking-ass. 🅰️🅱️🅲️**
