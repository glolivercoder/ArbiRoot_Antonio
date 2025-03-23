import axios from 'axios';

async function testBinanceApi() {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
    console.log('Binance API response:', response.data);
  } catch (error) {
    console.error('Error fetching Binance prices:', error);
  }
}

async function testCoinbaseApi() {
  try {
    const response = await axios.get('https://api.exchange.coinbase.com/products');
    console.log('Coinbase API response:', response.data);
  } catch (error) {
    console.error('Error fetching Coinbase prices:', error);
  }
}

(async () => {
  console.log('Testing Binance API...');
  await testBinanceApi();

  console.log('Testing Coinbase API...');
  await testCoinbaseApi();
})();