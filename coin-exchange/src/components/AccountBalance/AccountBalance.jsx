import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AccountBalance extends Component {
    render() {
        return (
            <>
                ${this.props.amount}
            </>
        );
    }
}




AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired,
}