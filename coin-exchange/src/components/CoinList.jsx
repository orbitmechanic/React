import React, { Component } from 'react'
import Coin from './Coin';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Table = styled.table`
    margin: 50px auto 50px auto;
    display: inline-block;
    font-size: 1.4rem;
`

export default class CoinList extends Component {
    render() {
        let columnLabel = null;
        if (this.props.showBalance) {
            columnLabel = <th>Balance</th>
        }
        return (
            <Table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Ticker</th>
                    {columnLabel}
                    <th>Price</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.props.coinData.map( ({name, ticker, balance, price}) => 
                        <Coin key = {ticker} 
                              handleRefresh={this.props.handleRefresh}
                              name={name}
                              ticker={ticker}
                              balance={balance}
                              price={price} 
                              showBalance={this.props.showBalance}/>
                    )
                    }
                </tbody>
            </Table>
        )
    }
}

CoinList.propTypes = {
    showBalance: PropTypes.bool.isRequired,
}
