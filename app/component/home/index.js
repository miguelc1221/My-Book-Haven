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
                            <img src="../img/books.png" />
                            <h2>About</h2>
                            <p>My Book Haven is a book manager app built with React/Redux/React-Router, ExpressJS and MongoDB. The purpose of this project was to build an app where I can keep track of books that were recommended (which I always seem to forget) and to practice developing with my favorite tech stack. As a registered user you can search for any book and add it your library. Your books will be organized by books you already read and books that were recommended. </p>
                        </Col>
                        <Col xs={12} md={6}>
                            <img src="../img/Facebook.png" />
                            <h2>Social Login</h2>
                            <p>My Book Haven uses auth0 to authenticate users. New users have the option of creating a new account or logging in with their Facebook or Google accounts.</p>
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
}

export default Home;
