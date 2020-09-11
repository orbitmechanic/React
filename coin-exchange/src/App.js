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
      coinData: [
        /*
        { name: 'BitCoin',
          ticker:'BTC',
          balance: 0.5,
          price: 9999.99,
        },
        { name: 'Ethereum',
          ticker: 'ETH',
          balance: 32.0,
          price: 299.0,
        },
        { name: 'Tether',
          ticker:'USDT',
          balance: 0.0,
          price: 1.0,
        },
        { name: 'Ripple',
          ticker: 'XRP',
          balance: 1000,
          price: 0.2,
        },
        { name: 'BitCoin Cash',
          ticker: 'BCH',
          balance: 0.0,
          price: 298.99,
        }
      */]
  };
  componentDidMount = async () => {
    let repsonse = await axios.get('https://api.coinpaprika.com/v1/coins')
    let coinData = repsonse.data.slice(0,COIN_COUNT).map( function (coin) {
      return {
        key:     coin.id,
        name:    coin.name,
        ticker:  coin.symbol,
        balance: 0,
        price:   0,
      };
    });
    // Retrieve the prices
    this.setState({ coinData});
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