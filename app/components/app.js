import React, { Component } from 'react';
require('../global.scss');
require('bootstrap/dist/css/bootstrap.css');
require('toastr/build/toastr.min.css');

import AppNavBar from './common/navbar';

export default class App extends Component {
    render() {
        return (
            <div className="flex-container">
                <header>
                    <AppNavBar {...this.props} />
                </header>
                <main>
                    {this.props.children}
                </main>
                <footer>
                    <p>&copy; 2016 Miguel Correa</p>
                </footer>
            </div>
        )
    }
}
