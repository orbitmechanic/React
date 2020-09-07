import React from 'react';
import AppHeader from './components/AppHeader';
import CoinList from './components/CoinList';
import AccountBalance from './components/AccountBalance';
import styled from 'styled-components';

const AppStyle = styled.div`
  text-align: center;
  background-color: darkslategray;
  color: #cccccc;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apName: 'Coin Exchange',
      balance: 10000,
      coinData: [
        { name: 'BitCoin',
          ticker:'BTC',
          price: 9999.99,
        },
        { name: 'Ethereum',
          ticker: 'ETH',
          price: 299.0,
        },
        { name: 'Tether',
          ticker:'USDT',
          price: 1.0,
        },
        { name: 'Ripple',
          ticker: 'XRP',
          price: 0.2,
        },
        { name: 'BitCoin Cash',
          ticker: 'BCH',
          price: 298.99,
        }
      ],
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }
  handleRefresh(valueChangeTicker) {
    const newCoinData = this.state.coinData.map(function ({ticker, name, price}) {
      let newPrice = price;
      if ( valueChangeTicker === ticker) {
        const randomPercentage = 0.995 + Math.random()*0.01;
        newPrice = newPrice * randomPercentage;
      }
      return {
        ticker,
        name,
        price: newPrice,
      }
    });  
    
    this.setState({coinData: newCoinData});
  }
  render() {
    return (
      <AppStyle>
        <AppHeader apName={this.state.apName}/>
        <AccountBalance amount={this.state.balance}/>
        <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh} />
      </AppStyle>
    );
  }
}

export default App;