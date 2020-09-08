import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem;
`;

export default class AccountBalance extends Component {
    render() {
        let buttonText = this.props.showBalance ? 'Hide Balance' : 'Show Balance';
        let content = this.props.showBalance ? <>Balance: ${this.props.amount}</> : null;
        return (
            <Section>
                {content}
                <button onClick={this.props.toggleBalanceVisibility}>{buttonText}</button>
            </Section>
        );
    }
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired,
    showBalance: PropTypes.bool.isRequired,
}