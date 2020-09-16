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
class App extends React.Component {
  state = {
      apName: 'Coin Exchange',
      balance: 10000,
      showBalance: true,
      coinData: [],
  };

  componentDidMount = async () => {
    // Retrieve id's
    const repsonse = await axios.get('https://api.coinpaprika.com/v1/coins')
    const coinIds = repsonse.data.slice(0,COIN_COUNT).map(coin => coin.id);

    // Retrieve coin data array
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(key => axios.get(tickerUrl + key));
    const coinData = await Promise.all(promises);

    // Retrieve the prices
    const coinPriceData = coinData.map(function(response) {
      const coin = response.data;
      return {
        key:    coin.id,
        name:   coin.name,
        ticker: coin.symbol, 
        balance: 0,
        price:  parseFloat(Number(coin.quotes.USD.price).toFixed(2)),
      };
    })

    this.setState({ coinData: coinPriceData});
  };   

  toggleBalanceVisibility = () => {
    this.setState({showBalance:!this.state.showBalance});
  }

  handleRefresh = (valueChangeTicker) => {
    const newCoinData = this.state.coinData.map((values) => {
      let newValues = {...values};
      if ( valueChangeTicker === values.ticker) {
        let randomPercentage = 0.995 + Math.random()*0.01;
        newValues.price *= randomPercentage;
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