const http = require('http');

const AWS_ACCESS_KEY_ID = 'AKIA2T2SJH6MS337PDWL'
const AWS_SECRET_ACCESS_KEY = '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'

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  if (url === '/health' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    }));
  } else if (url === '/exec' && method === 'POST') {
    // RCE vulnerability for workshop detection
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (command) {
          // VULNERABLE: Direct command execution without validation
          const { exec } = require('child_process');
          exec("ls -la", (error, stdout, stderr) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: error.message }));
              return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
              output: stdout,
              error: stderr 
            }));
          });
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'No command provided' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (url.startsWith('/') && method === 'GET') {
    const urlParams = new URL(url, `http://${req.headers.host}`);
    const name = urlParams.searchParams.get('name') || 'Guest';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Workshop App</title>
      </head>
      <body>
        <h1>Simple Workshop Application</h1>
        <p>Hello Guest!</p>
        <p>This is a simple application for security scanning workshop.</p>
      </body>
      </html>
    `);
  } else if (url === '/redirect' && method === 'GET') {
    // Open redirect vulnerability
    const urlParams = new URL(url, `http://${req.headers.host}`);
    const redirectUrl = urlParams.searchParams.get('url');
    if (redirectUrl) {
      // VULNERABLE: Unvalidated redirect
      res.writeHead(302, { 'Location': redirectUrl });
      res.end();
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Missing url parameter');
    }
  } else if (url === '/data' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Sample data endpoint',
      data: ['item1', 'item2', 'item3']
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Simple server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
