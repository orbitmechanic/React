import React, {useState} from 'react';
import AppHeader from './components/AppHeader';
import CoinList from './components/CoinList';
import AccountBalance from './components/AccountBalance';
import styled from 'styled-components';
import axios from 'axios';

const AppStyle = styled.div`
  text-align: center;
  background-color: darkslategray;
  color: #cccccc;
`
const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(2));

function App (props) {

  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [apName, setApName] = useState('Coin Exchange');

  const getIDs = async () => {
    // Fetch the IDs of first COIN_COUNT items.
    const repsonse = await axios.get('https://api.coinpaprika.com/v1/coins')
    return repsonse.data.slice(0,COIN_COUNT).map(coin => coin.id);
  }

  const getCoinData = async(coinIds) => {
    // Retrieve coin data array for given coin id's.
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(key => axios.get(tickerUrl + key));
    return await Promise.all(promises);
  }

  const extractPrices = (coinData) => {
    // Extract prices from given coinData array
    return coinData.map(function(response) {
      const coin = response.data;
      return {
        key:    coin.id,
        name:   coin.name,
        ticker: coin.symbol, 
        balance: 0,
        price:  formatPrice(coin.quotes.USD.price),
      };
    });
  }

  const loadAllAPIData = async () => {
    // Load API data for all items.
    const coinIds = await getIDs();
    const coinData = await getCoinData(coinIds);
    const coinPriceData = extractPrices(coinData);
    setCoinData(coinPriceData);
  }

  const componentDidMount = async () => {
    // hook for timing.  Do this:
    loadAllAPIData();
  };   

  const toggleBalanceVisibility = () => {
    setShowBalance(oldValue => !oldValue);
  }

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map((values) => {
      let newValues = {...values};
      if ( valueChangeId === values.key) {
        newValues.price = newPrice;
      }
      return newValues;
    });  
    setCoinData(newCoinData);
  }

  return (
    <AppStyle>
      <AppHeader 
        apName={apName}/>
      <AccountBalance 
        amount={balance} 
        showBalance={showBalance}
        toggleBalanceVisibility={toggleBalanceVisibility}/>
      <CoinList 
        coinData={coinData} 
        handleRefresh={handleRefresh} 
        showBalance={showBalance} />
    </AppStyle>
  );
}

export default App;