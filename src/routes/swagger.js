/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import SwaggerConfig from '../config/swagger';

const router = Router();

const specs = swaggerJsdoc({
  swaggerDefinition: SwaggerConfig,
  apis: ['src/docs/*.yml', 'src/routes/*.js'],
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  }),
);

export default router;
