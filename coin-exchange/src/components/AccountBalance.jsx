import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem;
`;

export default function AccountBalance (props) {
    
    let buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    let content = props.showBalance ? <>Balance: ${props.amount}</> : null;

    return (
        <Section>
            {content}
            <button onClick={props.toggleBalanceVisibility}>{buttonText}</button>
        </Section>
    );
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired,
    showBalance: PropTypes.bool.isRequired,
}