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
        <p>Hello ${name}!</p>
        <p>This is a simple application for security scanning workshop.</p>
      </body>
      </html>
    `);
  } else if (url.startsWith('/user/') && method === 'GET') {
    const userId = url.split('/')[2];
    // Vulnerable: Direct string concatenation for SQL query
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      message: 'User lookup', 
      query: query,
      userId: userId 
    }));
  } else if (url.startsWith('/ping/') && method === 'GET') {
    const host = url.split('/')[2];
    const { exec } = require('child_process');
    
    // Vulnerable: Direct command execution with user input
    exec(`ping -c 1 ${host}`, (error, stdout, stderr) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        host: host,
        result: stdout || stderr || 'No output'
      }));
    });
  } else if (url.startsWith('/file/') && method === 'GET') {
    const filename = url.split('/')[2];
    const fs = require('fs');
    
    // Vulnerable: No path sanitization
    const filepath = `./uploads/${filename}`;
    try {
      const content = fs.readFileSync(filepath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(content);
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File not found' }));
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
