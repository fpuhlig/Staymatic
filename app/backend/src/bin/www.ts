#!/usr/bin/env node

import debug from 'debug';
import http from 'http';
import { APP_CONSTANTS } from '@shared/constants';
import app from '../app';

const debugLog = debug('backend:server');

// Normalize a port into a number, string, or false
function normalizePort(val: string): number | string | false {
  const portNum = parseInt(val, 10);

  if (Number.isNaN(portNum)) {
    // named pipe
    return val;
  }

  if (portNum >= 0) {
    // port number
    return portNum;
  }

  return false;
}

// Get port from environment and store in Express
const port = normalizePort(process.env.PORT || APP_CONSTANTS.DEFAULT_BACKEND_PORT.toString());
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Event listener for HTTP server "error" event
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event
function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  debugLog(`Listening on ${bind}`);
}

// Listen on provided port, on all network interfaces
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
