import React, { Component } from 'react';
import './AccountBalance.css';
import PropTypes from 'prop-types';

export default class AccountBalance extends Component {
    render() {
        return (
            <div className='account-balance'>
                ${this.props.amount}
            </div>
        );
    }
}




AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired,
}