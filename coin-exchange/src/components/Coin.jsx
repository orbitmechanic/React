import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableData = styled.td`
    border: 1px solid #cccccc;
    width: 16vw;
`;

const TableDataName = styled(TableData)`
    width: 20vw;
`;

const TableDataControls = styled(TableData)`
    width: 16vw;
`;

const Button = styled.button`
    font-size: 11px;
    width: 64px;
    margin: 3px 5px 0;
`;

export default function Coin(props) {

    const handleRefresh = (event) => {
        // Refresh the screen
        event.preventDefault();
        props.handleRefresh(props.tickerId);
    }

    const handleBuy = (event) => {
        // Purchase tokens
        event.preventDefault();
        props.handleTransaction(true, props.tickerId);
    }

    const handleSell = (event) => {
        // Sell tokens
        event.preventDefault();
        props.handleTransaction(false, props.tickerId);
    }

    let balanceDisplay = props.showBalance ?
        <TableData>{props.balance}</TableData> : '-';

    return (
        <tr>
            <TableDataName>{props.name}</TableDataName>
            <TableData>{props.ticker}</TableData>
            {balanceDisplay}
            <TableData>${props.price}</TableData>
            <TableDataControls>
                <form action="#" method="POST">
                    <Button className='btn btn-info' 
                        onClick={handleRefresh}>Refresh
                    </Button>
                    <Button className='btn btn-warning' 
                        onClick={handleBuy}>Buy
                    </Button>
                    <Button className='btn btn-danger' 
                        onClick={handleSell}>Sell
                    </Button>
                </form>
            </TableDataControls>
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