import fetch from 'node-fetch';

const url = 'https://bittrex.com/api/v1.1';

// @@@-------- Public Api

//  Used to get the open and available trading markets at Bittrex along with other meta data.
export const getmarkets = async () => {
  let result;
  try {
    const response = await fetch(`${url}/public/getmarkets`);
    result = await response.json();
  } catch (e) {
    throw '@getmarkets failed!'
  }

  const data = result.result.map(({ MarketCurrency, BaseCurrency, MarketCurrencyLong, MarketName, IsActive, Created, IsSponsored, LogoUrl }) => {
    return {
      MarketCurrency,
      BaseCurrency,
      MarketCurrencyLong,
      IsActive,
      Created,
      IsSponsored,
      LogoUrl,
    }
  });

  return data;
};

//  Used to get all supported currencies at Bittrex along with other meta data.
export const getcurrencies = async () => {
  let result;
  try {
    const response = await fetch(`${url}/public/getcurrencies`);
    result = await response.json();
  } catch (e) {
    throw '@getcurrencies failed!'
  }

  const data = result.result.map(({ Currency, CurrencyLong, TxFee, IsActive, CoinType }) => {
    return {
      Currency,
      CurrencyLong,
      TxFee,
      IsActive,
      CoinType,
    }
  });

  return result;
};

//  Used to get the current tick values for a market.
//  @param: market ex: BTC-LTC
export const getticker = async (market) => {
  let result;
  try {
    const response = await fetch(`${url}/public/getticker?market=${market}`);
    result = await response.json();
  } catch (e) {
    throw '@getticker failed!'
  }

  return result.result;
}

//  Used to get the last 24 hour summary of all active exchanges
export const getmarketsummaries = async () => {
  let result;
  try {
    const response = await fetch(`${url}/public/getmarketsummaries`);
    result = await response.json();
  } catch (e) {
    throw '@getmarketsummaries failed!'
  }

  const data = result.result.map(({ MarketName, High, Low, Volume, Last, BaseVolume,
    TimeStamp, Bid, Ask, OpenBuyOrders, OpenSellOrders, PrevDay, Created,  }) => {
    return {
      MarketName,
      High,
      Low,
      Volume,
      Last,
      BaseVolume,
      TimeStamp,
      Bid,
      Ask,
      OpenBuyOrders,
      OpenSellOrders,
      PrevDay,
      Created,
    }
  });

  return data;
}

//  Used to get the last 24 hour summary of all active exchanges
//  @param:
//  market	required	a string literal for the market (ex: BTC-LTC)
export const getmarketsummary = async ({ market }) => {
  let result;
  try {
    const response = await fetch(`${url}/public/getmarketsummary?market=${market}`);
    result = await response.json();
  } catch (e) {
    throw '@getmarketsummary failed!'
  }

  const data = result.result.map(({ MarketName, High, Low, Volume, Last, BaseVolume,
    TimeStamp, Bid, Ask, OpenBuyOrders, OpenSellOrders, PrevDay, Created,  }) => {
    return {
      MarketName,
      High,
      Low,
      Volume,
      Last,
      BaseVolume,
      TimeStamp,
      Bid,
      Ask,
      OpenBuyOrders,
      OpenSellOrders,
      PrevDay,
      Created,
    }
  });

  return data;
}

//  Used to get retrieve the orderbook for a given market
//  @param:
//  - market	required	a string literal for the market (ex: BTC-LTC)
//  - type	required	buy, sell or both to identify the type of orderbook to return.
export const getorderbook = async ({ market, type }) => {
  let result;
  try {
    const response = await fetch(`${url}/public/getorderbook?market=${market}&type=${type}`);
    result = await response.json();
  } catch (e) {
    throw '@getorderbook failed!'
  }

  return result.result;
}

//  Used to retrieve the latest trades that have occured for a specific market.
//  @param:
//  market	required	a string literal for the market (ex: BTC-LTC)
export const getmarkethistory = async ({ market }) => {
  let result;
  try {
    const response = await fetch(`${url}/public/getmarkethistory?market=${market}`);
    result = await response.json();
  } catch (e) {
    throw '@getmarkethistory failed!'
  }

  return result.result;
}


// @@@-------- Market Apis

// Used to place a buy order in a specific market. Use buylimit to place limit orders. Make sure you have the proper permissions set on your API keys for this call to work
// @param
// market	required	a string literal for the market (ex: BTC-LTC)
// quantity	required	the amount to purchase
// rate	required	the rate at which to place the order.
export const buylimit = async ({ apikey, market, quantity, rate }) => {
  let result;
  try {
    const response = await fetch(`${url}/market/buylimit?apikey=${apikey}&market=${market}&quantity=${quantity}&rate=${rate}`);
    result = await response.json();
  } catch (e) {
    throw '@buylimit failed!'
  }

  return result.result;
}

// Used to place a sell order in a specific market. Use selllimit to place limit orders. Make sure you have the proper permissions set on your API keys for this call to work
// @param
// market	required	a string literal for the market (ex: BTC-LTC)
// quantity	required	the amount to purchase
// rate	required	the rate at which to place the order.
export const selllimit = async ({ apikey, market, quantity, rate }) => {
  let result;
  try {
    const response = await fetch(`${url}/market/selllimit?apikey=${apikey}&market=${market}&quantity=${quantity}&rate=${rate}`);
    result = await response.json();
  } catch (e) {
    throw '@selllimit failed!'
  }

  return result.result;
}

// Used to cancel a buy or sell order.
// @param
// uuid	required	uuid of buy or sell order
export const cancel = async ({ apikey, order_uuid }) => {
  let result;
  try {
    const response = await fetch(`${url}/market/cancel?apikey=${apikey}&uuid=${order_uuid}`);
    result = await response.json();
  } catch (e) {
    throw '@cancel failed!'
  }

  return result.result;
}

// Get all orders that you currently have opened. A specific market can be requested
// @param
// market	required	a string literal for the market (ex: BTC-LTC)
export const getopenorders = async ({ apikey, market, quantity, rate }) => {
  let result;
  try {
    const response = await fetch(`${url}/market/getopenorders?apikey=${apikey}&market=${market}`);
    result = await response.json();
  } catch (e) {
    throw '@getopenorders failed!'
  }

  return result.result;
}


// @@@-------- Account Api

// Used to retrieve all balances from your account
export const getbalances = async ({ apikey }) => {
  let result;
  try {
    const response = await fetch(`${url}/account/getbalances?apikey=${apikey}`);
    result = await response.json();
  } catch (e) {
    throw '@getbalances failed!'
  }

  return result.result;
}


// Used to retrieve all balances from your account
// @param
// currency	required	a string literal for the currency (ex: LTC)
export const getbalance = async ({ apikey, currency }) => {
  let result;
  try {
    const response = await fetch(`${url}/account/getbalances?apikey=${apikey}&currency=${currency}`);
    result = await response.json();
  } catch (e) {
    throw '@getbalance failed!'
  }

  return result.result;
}

// Used to retrieve a single order by uuid.
// @param
// uuid	required	the uuid of the buy or sell order
export const getorder = async ({ order_uuid }) => {
  let result;
  try {
    const response = await fetch(`${url}/account/getorder&uuid=${order_uuid}`);
    result = await response.json();
  } catch (e) {
    throw '@getorder failed!'
  }

  return result.result;
}

// Used to retrieve your order history.
// @param:
// market	optional	a string literal for the market (ie. BTC-LTC). If ommited, will return for all markets
export const getorderhistory = async ({ market }) => {
  let result;
  try {
    const response = await fetch(`${url}/account/getorderhistory&market=${market}`);
    result = await response.json();
  } catch (e) {
    throw '@getorderhistory failed!'
  }

  return result.result;
}
