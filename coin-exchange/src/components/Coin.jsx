import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableData = styled.td`
    border: 1px solid #cccccc;
    width:25vh;
`;

export default class Coin extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

   handleClick(event) {
       // prevent the default action of submitting the form
       event.preventDefault();
       this.props.handleRefresh(this.props.ticker);
/*
       const randomPercentage = 0.995 + Math.random()*0.01;
       this.setState( function(oldState) {
        return {
            price: oldState.price * randomPercentage
        };
    });
*/
   }

    render() {
        let balanceDisplay = null;
        if (this.props.showBalance) {
            balanceDisplay = <TableData>{this.props.balance}</TableData>;
        }
        return (
            <tr>
                <TableData>{this.props.name}</TableData>
                <TableData>{this.props.ticker}</TableData>
                {balanceDisplay}
                <TableData>${this.props.price}</TableData>
                <TableData>
                    <form action="#" method="POST">
                        <button onClick={this.handleClick}>Refresh</button>
                    </form>
                </TableData>
            </tr>
        );
    }
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    showBalance: PropTypes.bool.isRequired,
}