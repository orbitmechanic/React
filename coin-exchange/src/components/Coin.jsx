import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableData = styled.td`
    border: 1px solid #cccccc;
    width:25vh;
`;

export default function Coin(props) {

    const handleClick = (event) => {
        // prevent the default action of submitting the form
        event.preventDefault();
        props.handleRefresh(props.tickerId);
    }

    let balanceDisplay = props.showBalance ?
        <TableData>{props.balance}</TableData> : null;

    return (
        <tr>
            <TableData>{props.name}</TableData>
            <TableData>{props.ticker}</TableData>
            {balanceDisplay}
            <TableData>${props.price}</TableData>
            <TableData>
                <form action="#" method="POST">
                    <button onClick={handleClick}>Refresh</button>
                </form>
            </TableData>
        </tr>
    );
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    showBalance: PropTypes.bool.isRequired,
}