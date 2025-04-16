const http = require("http");

const server = http.createServer((req, res) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    console.log(req.headers);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Still working!');
  });

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
