# ✅ Lesson 2: Serve and Update JSON Data with a POST Request

In this lesson, I extended my raw Node.js server to handle POST requests. The goal was to accept incoming JSON, parse it, and add it to an existing `.json` file — mimicking how a backend might receive and store data. It sounds simple, but this turned out to be one of the most involved and satisfying lessons so far.

---

## 🛠️ What I Built

A Node.js server that:

- Listens on `localhost:3000`
- Responds to `GET /` with plain text
- Accepts `POST` requests at `/api/bbc/events`
- Parses JSON sent from a client
- Reads and updates `bbcObject.json`
- Responds with confirmation and the new event object

---

## 📄 Final Working Code

```js
else if (url === "/api/bbc/events" && method === "POST") {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const newEvent = JSON.parse(body);

      fs.readFile(bbcFilePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to read file" }));
          return;
        }

        const parsed = JSON.parse(data);
        parsed.event.push(newEvent);

        fs.writeFile(bbcFilePath, JSON.stringify(parsed, null, 2), (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to write file" }));
          } else {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, newEvent }));
          }
        });
      });
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
}
```

---

## 🧠 Concepts I Explored

- `req.on('data')`: Node streams the request body in chunks, and I had to append each one manually to build the full JSON string.
- `req.on('end')`: Only after all chunks were received could I parse the full string with `JSON.parse()`.
- `try...catch`: I added error handling in case the incoming JSON was malformed.
- `fs.readFile()` / `fs.writeFile()`: I updated a local `.json` file to simulate storing new data — learning that I had to overwrite the whole file each time.

---

## 🔀 Side Streets & Learning Tangents

This lesson turned into an epic learning adventure. Here are some of the rabbit holes and detours that actually helped me understand how this all works:

- 🧵 I spent time wondering how `req` and `res` work, and what kind of object `req` really is. Learned it's a readable stream and uses EventEmitter.
- 🤯 Explored `.on('data')` and learned about stream chunking and buffering.
- ❓ Questioned why `chunk` wasn’t called something more meaningful — realized it’s just a parameter name and can be anything.
- 🔄 Used `req.setEncoding('utf8')` to ensure chunks came in as strings.
- 🧪 Wrapped the entire `req.on('end')` block in a try/catch for ultimate safety.
- 🧱 Learned how `fs.writeFile()` requires me to recreate the entire object in memory before saving.
- 📁 Learned the significance of using `path.join(__dirname, ...)` to build stable file paths.
- ⚖️ Paused to ask the difference between status codes like 400 and 500 — which one should I return when JSON parsing fails? Answer: 400.
- ❌ Postman gave me tons of problems (auto-adding headers, failing silently)
- 🔓 VPN blocked my ability to use curl and Postman at all — had to disable it to make anything work.
- 😤 Got super frustrated when nothing was being written to the JSON file — only to realize I was returning the response before the `fs.writeFile()` call.

---

## 🧪 curl Testing Commands

### GET

```bash
curl http://localhost:3000/
```

### POST

```bash
curl -X POST http://localhost:3000/api/bbc/events \
  -H "Content-Type: application/json" \
  -d '{"id": "999", "title": "Back in server.js"}'
```

---

## ✅ Final Result

My `bbcObject.json` file now contains:

```json
{
  "id": "999",
  "title": "Back in server.js"
}
```

...which confirms that the full POST lifecycle works: receive → parse → store → respond.

---

## 🧱 What’s Next

In Lesson 3, I’ll either:

- Add a frontend that submits data to this route, or
- Build out full CRUD with PUT and DELETE methods

---

## ABC

**Always Be Kicking-ass. 🅰️🅱️🅲️**
