import React, { Component, PropTypes } from 'react';
import BookList from '../common/booklist';
import { Tabs, Tab } from 'react-bootstrap';
import './styles.scss';

class Library extends Component {
    constructor(props) {
        super(props);

        this.handleAddbook = this.handleAddbook.bind(this)
        this.deleteBook = this.deleteBook.bind(this)
    }

    handleAddbook(book) {
        const token = localStorage.getItem('id_token');
        const profile = localStorage.getItem('profile');
        const email = JSON.parse(profile);
        this.props.bookActions.addBook(book,email,token)
    }

    deleteBook(book) {
        const token = localStorage.getItem('id_token');
        const profile = localStorage.getItem('profile');
        const email = JSON.parse(profile);
        this.props.bookActions.deleteBook(book,email,token)
    }

    render() {
        const { bookActions: { addBook }, book: { userBooks } } = this.props;
        let haveRead = userBooks.filter((val) => {
            return val.haveRead;
        });
        let recommended = userBooks.filter((val) => {
            return val.recommended;
        });

        return (
            <div className="container app-library">
                <Tabs defaultActiveKey={1} id="controlled-tab-example">
                    <Tab eventKey={1} title="All">
                        <BookList books={userBooks} addBook={this.handleAddbook} deleteBook={this.deleteBook} />
                    </Tab>
                    <Tab eventKey={2} title="Have Read">
                        <BookList books={haveRead} addBook={this.handleAddbook} deleteBook={this.deleteBook} />
                    </Tab>
                    <Tab eventKey={3} title="Recommended">
                        <BookList books={recommended} addBook={this.handleAddbook} deleteBook={this.deleteBook}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

Library.propTypes = {
    book: PropTypes.object.isRequired,
    bookActions: PropTypes.object.isRequired
}

export default Library;
