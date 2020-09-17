import React from 'react'
import Coin from './Coin';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Table = styled.table`
    display: inline-block;
    font-size: 1.4rem;
`

export default function CoinList (props){
    
    let columnLabel = <th>Balance</th>;
    
    return (
        <Table className='table-bordered'>
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
                {props.coinData.map( ({key, name, ticker, balance, price}) => 
                        <Coin key = {key} 
                            handleRefresh={props.handleRefresh}
                            handleTransaction={props.handleTransaction}
                            name={name}
                            ticker={ticker}
                            balance={balance}
                            showBalance={props.showBalance}
                            price={price} 
                            tickerId={key} />
                    )
                }
            </tbody>
        </Table>
    )
}

CoinList.propTypes = {
    showBalance: PropTypes.bool.isRequired,
}
