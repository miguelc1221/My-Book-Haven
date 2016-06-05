import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Book from '../book';

const BookList = ({ addToHaveRead, addToRecommended, deleteBook, books }) => {
    const list = books.map((val,idx) => {
            return (
                <Col xs={12} md={4} key={idx}>
                    <Book
                        book={val}
                        addToHaveRead={addToHaveRead}
                        addToRecommended={addToRecommended}
                        deleteBook={deleteBook}
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
    addToHaveRead: PropTypes.func,
    addToRecommended: PropTypes.func,
    books: PropTypes.array.isRequired
}

export default BookList;
