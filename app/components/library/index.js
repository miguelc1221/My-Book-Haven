import React, { Component, PropTypes } from 'react';
import BookList from '../common/booklist';
import { Tabs, Tab } from 'react-bootstrap';
import './styles.scss';

class Library extends Component {
    constructor(props) {
        super(props);

        this.addToHaveRead = this.addToHaveRead.bind(this);
        this.addToRecommended = this.addToRecommended.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    addToHaveRead(book) {
        const { credentials: { email, token } } = this.props.status;
        book.haveRead = true;
        book.recommended = false;
        this.props.bookActions.addBook(book,email,token);
    }

    addToRecommended(book) {
        const { credentials: { email, token } } = this.props.status;
        book.haveRead = false;
        book.recommended = true;
        this.props.bookActions.addBook(book,email,token);
    }

    deleteBook(book) {
        const { credentials: { email, token } } = this.props.status;
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
                        <BookList
                            books={userBooks}
                            addToHaveRead={this.addToHaveRead}
                            addToRecommended={this.addToRecommended}
                            deleteBook={this.deleteBook} />
                    </Tab>
                    <Tab eventKey={2} title="Have Read">
                        <BookList
                            books={haveRead}
                            addToRecommended={this.addToRecommended}
                            deleteBook={this.deleteBook} />
                    </Tab>
                    <Tab eventKey={3} title="Recommended">
                        <BookList
                            books={recommended}
                            addToHaveRead={this.addToHaveRead}
                            deleteBook={this.deleteBook}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

Library.propTypes = {
    status: PropTypes.object,
    book: PropTypes.object.isRequired,
    bookActions: PropTypes.object.isRequired
}

export default Library;
