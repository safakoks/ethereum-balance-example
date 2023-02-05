import Logger from './utils/logger';
import Config from './config';
import App from './app';

const server = App.listen(Config.serverPort, () => {
  Logger.info(`Listening to port ${Config.serverPort}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      Logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  Logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  Logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
