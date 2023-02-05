/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import HttpStatus from 'http-status';

// Routes
import SwaggerRoute from './routes/swagger';
import EthRoutes from './routes/eth';
import ApiError from './utils/api-error';

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// Api Routes
app.use('/swagger', SwaggerRoute);
app.use('/eth', EthRoutes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(HttpStatus.NOT_FOUND, 'Not found'));
});

app.use((err, _req, _res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || HttpStatus.BAD_REQUEST;
    const message = error.message || HttpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).send(response);
});

export default app;
