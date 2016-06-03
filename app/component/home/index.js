import React, { Component, PropTypes } from 'react';
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';

import './styles.scss';

class Home extends Component {
    render () {
        return (
            <section>
                <Jumbotron className='app-jumbotron'>
                    <h1>My Book Haven</h1>
                    <div className="overlay"></div>
                </Jumbotron>
                <Grid>
                    <Row className="app-row">
                        <Col xs={12} md={6}>
                            <h2>About</h2>
                            <p>My Book Haven is a book manager app built with Angular 2, Rxjs/store, ExpressJs and MongoDB. The purpose of this project was to learn Angular 2 and to keep track of books that were recommended, which i always seem to forget. As a registered user you can search for any book and add it your library. Your books will be organize by books you already read and books that were recommended.</p>
                        </Col>
                        <Col xs={12} md={6}>
                            <h2>About</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
}

export default Home;
