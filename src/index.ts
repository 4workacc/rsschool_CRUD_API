import { createServer, IncomingMessage, ServerResponse } from 'http';
 
const port = 5000;
 
const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  response.end('Hello world!');
});
 
server.listen(port);