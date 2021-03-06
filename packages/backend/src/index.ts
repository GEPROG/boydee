import { Server } from 'http';

import pkg from '@/../package.json';
import * as database from '@/lib/database';
import logger from '@/lib/logger';

import app from './app';

const NODE_ENV = process.env.NODE_ENV || 'production';
let server: Server;

async function start() {
  logger.info('Application (%s v%s) starting ...', NODE_ENV, pkg.version);

  // block, because we need our database to work properly
  await database.connect(app);

  const hostname = app.get('host');
  const port = app.get('port');
  server = app.listen(port);

  server.on('listening', () => logger.info('Application started on http://%s:%d', hostname, port));
}

async function stop(): Promise<void> {
  if (!server) {
    return;
  }

  return new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });
}

async function shutdown(): Promise<void> {
  logger.info('Stopping application ...');

  // wait 3 seconds to kill server
  setTimeout(() => {
    logger.error('Could not close server in time, forcefully shutting down');
    process.exit(1);
  }, 3 * 1000);

  await stop();
  logger.info('Application stopped');
  process.exit(0);
}

function exitHook() {
  void shutdown();
}

process.once('SIGINT', exitHook);
process.once('SIGTERM', exitHook);

if (NODE_ENV === 'production') {
  process.on('uncaughtException', (error) => logger.error('Uncaught exception', error));
  process.on('uncaughtExceptionMonitor', (error) => logger.error('Uncaught exception monitor', error));
  process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));
}

void start();
