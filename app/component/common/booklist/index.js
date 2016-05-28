import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Book from '../book';

const BookList = (props) => {
    const list = props.books.map((val,ind) => {
            return (
                <Col xs={12} md={4} key={ind}>
                    <Book
                        BookObj={val}
                        addBook={props.addBook}
                        />
                </Col>
            )
        })
    return (
        <Grid>
            <Row className="show-grid">
                { list }
            </Row>
        </Grid>
    )
}

export default BookList;
