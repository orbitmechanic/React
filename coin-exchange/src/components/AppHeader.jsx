import React, { Component } from 'react'
import logo from './logo.svg'
import PropTypes from 'prop-types';

export default class AppHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            apName: this.props.apName
        }
    }
    render() {
        return (
            <header className = 'App-header'>
                <img src = {logo} alt='React logo' className = 'App-logo'/>
                <h1 className='App-Title'>{this.state.apName}</h1>
            </header>
        )
    }
}

AppHeader.propTypes = {
    apName: PropTypes.string.isRequired,
}
