import React from 'react';
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

class App extends React.Component {
  state = {
      apName: 'Coin Exchange',
      balance: 10000,
      showBalance: true,
      coinData: [],
  };

  getIDs = async () => {
    // Fetch the IDs of first COIN_COUNT items.
    const repsonse = await axios.get('https://api.coinpaprika.com/v1/coins')
    return repsonse.data.slice(0,COIN_COUNT).map(coin => coin.id);
  }

  getCoinData = async(coinIds) => {
    // Retrieve coin data array for given coin id's.
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(key => axios.get(tickerUrl + key));
    return await Promise.all(promises);
  }

  extractPrices = (coinData) => {
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

  loadAllAPIData = async () => {
    // Load API data for all items.
    const coinIds = await this.getIDs();
    const coinData = await this.getCoinData(coinIds);
    const coinPriceData = this.extractPrices(coinData);
    this.setState({ coinData: coinPriceData});
  }

  componentDidMount = async () => {
    // hook for timing.  Do this:
    this.loadAllAPIData();
  };   

  toggleBalanceVisibility = () => {
    this.setState({showBalance:!this.state.showBalance});
  }

  handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = this.state.coinData.map((values) => {
      let newValues = {...values};
      if ( valueChangeId === values.key) {
        newValues.price = newPrice;
      }
      return newValues;
    });  
    this.setState({coinData: newCoinData});
  }

  render() {
    return (
      <AppStyle>
        <AppHeader 
          apName={this.state.apName}/>
        <AccountBalance 
          amount={this.state.balance} 
          showBalance={this.state.showBalance}
          toggleBalanceVisibility={this.toggleBalanceVisibility}/>
        <CoinList 
          coinData={this.state.coinData} 
          handleRefresh={this.handleRefresh} 
          showBalance={this.state.showBalance} />
      </AppStyle>
    );
  }
}

export default App;