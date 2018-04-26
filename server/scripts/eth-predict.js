import fetch from 'node-fetch';
import { Neuron, Layer, Network, Trainer, Architect } from 'synaptic';

const unit = 'day'; // day | hour | minutes

const getHistoryMinute = async () => {
  let result;
  try {
    const response = await fetch(`https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=USDT&limit=2000&aggregate=3`);
    result = await response.json();
  } catch (e) {
    throw '@getcurrencies failed!'
  }

  const data = result.Data.map(({ time, open }) => {
    return open;
  });

  return data;
};

const getHistoryHour = async () => {
  let result;
  try {
    const response = await fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USDT&limit=2000&aggregate=3`);
    result = await response.json();
  } catch (e) {
    throw '@getcurrencies failed!'
  }

  const data = result.Data.map(({ time, open }) => {
    return open;
  });

  return data;
};

const getHistoryDay = async () => {
  let result;
  try {
    const response = await fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USDT&allData=true`);
    result = await response.json();
  } catch (e) {
    throw '@getcurrencies failed!'
  }

  const data = result.Data.map(({ time, open }) => {
    return open;
  });

  return data;
};

const predict = async (prices) => {
		let ratios = [];

		for(let i = 0; i < prices.length - 1; i++) {
			ratios[i] = prices[i + 1] / prices[i];
		}

		ratios = ratios.map(r => r / 10); /* divide by 10 so all under 1 */

		const network = new Architect.Perceptron(1, 3, 1);
		const trainer = new Trainer(network);

		const trainingSet = [];

		for(let i = 0; i < ratios.length - 1; i++) {
			trainingSet.push({
				input: [ ratios[i] ],
				output: [ ratios[i + 1] ]
			});
		}

    trainer.train(trainingSet, { iterations: 10 * 1000 });

		const nowCoin = prices[prices.length - 1];
		const futureCoin = prices[prices.length - 1] * network.activate([ ratios[ratios.length - 1] ]) * 10;

    return {
      nowCoin,
      futureCoin,
      increase: nowCoin < futureCoin,
    }
};

const load = async () => {
  console.log(await predict(await getHistoryMinute()));

  console.log(await predict(await getHistoryHour()));
  console.log(await predict(await getHistoryDay()));
}

load();
