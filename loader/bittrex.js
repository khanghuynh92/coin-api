import { getmarketsummaries,  } from './../server/helpers/bittrex';

const timer = 3000;

(async () => {
  global.marketSummaries = [];

  setInterval(async () => {
    global.marketSummaries = await getmarketsummaries();
  }, timer)
})();
