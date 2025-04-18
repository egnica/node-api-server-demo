const http = require("http");
const fs = require("fs");
const path = require("path");

const bbcFilePath = path.join(__dirname, "bbcObject.json");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(`Incoming ${method} request to ${url}`);

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Home Page!");
  } 
  else if (url === "/api/bbc/events" && method === "POST") {
    console.log("🔥 POST route triggered");

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      console.log("✅ End of request stream");
      console.log("RAW BODY:", body);

      try {
        const newEvent = JSON.parse(body);
        console.log("🎉 Parsed newEvent:", newEvent);

        fs.readFile(bbcFilePath, "utf8", (err, data) => {
          if (err) {
            console.log("❌ Error reading file:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to read file" }));
            return;
          }

          const parsed = JSON.parse(data);
          parsed.event.push(newEvent);

          console.log("📁 Writing to bbcObject.json...");
          fs.writeFile(bbcFilePath, JSON.stringify(parsed, null, 2), (err) => {
            if (err) {
              console.log("❌ Error writing file:", err);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Failed to write file" }));
            } else {
              console.log("✅ Successfully wrote to file.");
              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, newEvent }));
            }
          });
        });
      } catch (err) {
        console.log("❌ JSON Parse error:", err.message);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });

    req.on("error", (err) => {
      console.log("❌ Request stream error:", err.message);
    });
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
