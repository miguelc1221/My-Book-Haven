import React, { Component, PropTypes } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

import './styles.scss';

class Home extends Component {
    render () {
        return (
            <Jumbotron className='app-jumbotron'>
                <h1>Book Manager</h1>
                <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <p><Button bsStyle="primary">Learn more</Button></p>
            </Jumbotron>
        )
    }
}

export default Home;
