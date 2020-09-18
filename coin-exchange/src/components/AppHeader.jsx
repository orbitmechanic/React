import React from 'react'
import './animateLogo.css';
import logo from './logo.svg'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const H1 = styled.h1`
    font-size: 4rem;
`;

const Header = styled.header`
    background-color: #282c34;
    min-height: 20vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 36px;
    color: white;
`;

const Img = styled.img`
    height: 8 rem;
    pointer-events: none;
`

export default function AppHeader (props) {

    return (
        <Header>
            <Img src = {logo} alt='React logo' className = 'App-logo'/>
            <H1>{props.apName}</H1>
        </Header>
    )
}

AppHeader.propTypes = {
    apName: PropTypes.string.isRequired,
}
