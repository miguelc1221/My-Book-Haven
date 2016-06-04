import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Book from '../book';

const BookList = (props) => {
    const list = props.books.map((val,ind) => {
            return (
                <Col xs={12} md={4} key={ind}>
                    <Book
                        book={val}
                        addBook={props.addBook}
                        deleteBook={props.deleteBook}
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

BookList.propTypes = {
    deleteBook: PropTypes.func,
    addBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}

export default BookList;
