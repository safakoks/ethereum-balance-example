/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

// Routes
import SwaggerRoute from './routes/swagger';
import EthRoutes from './routes/eth';

const app = express();

// if (config.env !== 'test') {
//   app.use(morgan.successHandler);
//   app.use(morgan.errorHandler);
// }

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
app.use((req, res, next) => {
  next('Not found');
});

export default app;
