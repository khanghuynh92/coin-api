import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import marketCtrl from '../controllers/market.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/getmarketsummaries')
  /** GET /api/market/getmarketsummaries - Get list of market summaries */
  .get(marketCtrl.getmarketsummaries)

router.route('/getmarketsummary')
  /** GET /api/market/getmarketsummary - Get market detail */
  .get(validate(paramValidation.getmarketsummary), marketCtrl.getmarketsummary)

router.route('/getmymarketsummaries')
  /** GET /api/market/getmymarkets - Get my markets summaries */
  .get(validate(paramValidation.getmymarketsummaries), marketCtrl.getmymarketsummaries)

router.route('/predictbyhistoryday')
  /** GET /api/market/predictByHistoryDay - Predict coin today and tomorrow*/
  .get(validate(paramValidation.predictbyhistoryday), marketCtrl.predictbyhistoryday)

export default router;
