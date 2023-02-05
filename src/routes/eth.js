// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';

import EthController from '../controllers/eth';

const router = Router();

router
  .route('/balance')
  .post(EthController.getBalance);

export default router;

/**
 * @swagger
 * /eth/balance:
 *   post:
 *     summary: Get list of balances of given address
 *     description: Return ethereum balance information of given addreses.
 *     tags: [Eth]
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              addresses:
 *                type: array
 *                items:
 *                  type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  sorted_addresses:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        address:
 *                          type: string
 *                        eth_balance:
 *                          type: string
 *                        usd_balance:
 *                          type: string
 *                  wrong_addresses:
 *                    type: array
 *                    items:
 *                      type: string
 *       "400":
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  error_code:
 *                    type: number
 *                  error_message:
 *                    type: string
 * */
