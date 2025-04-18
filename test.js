else if (url === "/api/bbc/events" && method === "POST") {
    let body = '';
  
    req.on('data', chunk => {
      body += chunk;
    });
  
    req.on('end', () => {
      try {
        const newEvent = JSON.parse(body);
  
        fs.readFile('./bbcObject.json', 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to read file' }));
            return;
          }
  
          const parsed = JSON.parse(data);
          parsed.event.push(newEvent);
  
          fs.writeFile('./bbcObject.json', JSON.stringify(parsed, null, 2), err => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Failed to write file' }));
            } else {
              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, newEvent }));
            }
          });
        });
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }