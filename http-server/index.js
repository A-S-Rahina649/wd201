import { createServer } from 'http';
import { readFile } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = createServer((req, res) => {
  let filePath = 'home.html'; // default page

  if (req.url === '/project') {
    filePath = 'project.html';
  } else if (req.url === '/registration') {
    filePath = 'registration.html';
  }

  readFile(join(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Page not found');
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});