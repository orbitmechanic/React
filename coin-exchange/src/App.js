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
  }
  render() {
    return (
      <AppStyle>
        <AppHeader apName={this.state.apName}/>
        <AccountBalance amount={this.state.balance}/>
        <CoinList coinData={this.state.coinData} />
      </AppStyle>
    );
  }
}

export default App;
