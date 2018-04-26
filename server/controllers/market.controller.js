import User from '../models/user.model';

import * as bittrexHelper from './../helpers/bittrex.js';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Get market summaries list.
 * @property {string} req.query.filter - A string literal for the market.
 * @returns {market[]}
 */

const getmarketsummaries = (req, res, next) => {
  const filters = ['BTC', 'ETH', 'USDT'];
  let result = global.marketSummaries || [];
  if(req.query.filter) {
    if(filters.indexOf(req.query.filter) < 0) {
      return res.json([]);
    }
    let filter;
    switch (req.query.filter) {
      case 'BTC':
        filter = 'BTC-'
        break;
      case 'ETH':
        filter = 'ETH-'
        break;
      case 'USDT':
        filter = 'USDT-'
        break;
      default:
      case 'BTC':
        filter = 'BTC-'
        break;
    }

    result = global.marketSummaries.filter(coin => {
      return coin.MarketName.indexOf(filter) > -1;
    })
  }

  res.json(result);
}

/**
 * Get market summaries list.
 * @property {string} req.query.market - A string literal for the market.
 * @returns {market[]}
 */
const getmarketsummary = async (req, res, next) => {
  try {
    const result = await bittrexHelper.getmarketsummary({
      market: req.query.market,
    });
    res.json(result[0]);
  } catch (e) {
    const err = new APIError('Not found', httpStatus.NOT_FOUND, true);
    return next(err);
  }
};

/**
 * Get market summaries list.
 * @property {string} req.query.markets -
 * @returns {market[]}
 */
const getmymarketsummaries = async (req, res, next) => {
  const markets = req.query.markets.split(',');

  let result = global.marketSummaries.filter(coin => {
    return markets.indexOf(coin.MarketName) > -1;
  });

  res.json(result);
};

const predictbyhistoryday = async (req, res, next) => {
  try {
    const history = await bittrexHelper.getmarkethistory({
      market: req.query.market,
    })

    res.json(history)
  } catch (err) {
    const err = new APIError('Not found', httpStatus.NOT_FOUND, true);
    return next(err);
  }
}

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

export default { getmarketsummaries, getmarketsummary, getmymarketsummaries, predictbyhistoryday, load, get, create, update, list, remove };
