import React, { Component } from 'react';
require('../global.scss');
require('bootstrap/dist/css/bootstrap.css');

import AppNavBar from './common/navbar';

export default class App extends Component {
    render() {
        return (
            <div>
                <AppNavBar {...this.props} />
                {this.props.children}
            </div>
        )
    }
}
