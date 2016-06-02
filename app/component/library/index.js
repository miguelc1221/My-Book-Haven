import React, { Component, PropTypes } from 'react';
import BookList from '../common/booklist';
import { Tabs, Tab } from 'react-bootstrap';

class Library extends Component {
    constructor(props) {
        super(props);

        this.handleAddbook = this.handleAddbook.bind(this)
    }
    handleAddbook(book) {
        const token = localStorage.getItem('id_token');
        const profile = localStorage.getItem('profile');
        const email = JSON.parse(profile);

        this.props.bookActions.addBook(book,email,token)
    }

    deleteBook() {
        // delete action
        console.log('hi')
    }

    render() {
        const { bookActions: { addBook }, book: { userBooks } } = this.props;
        let haveRead = userBooks.filter((val) => {
            return val.haveRead;
        });
        let willRead = userBooks.filter((val) => {
            return val.willRead;
        });

        return (
            <div className="container">
                <Tabs defaultActiveKey={1} id="controlled-tab-example">
                    <Tab eventKey={1} title="All">
                        <BookList books={userBooks} addBook={this.handleAddbook} deleteBook={this.deleteBook} />
                    </Tab>
                    <Tab eventKey={2} title="Read">
                        <BookList books={haveRead} addBook={this.handleAddbook} deleteBook={this.deleteBook} />
                    </Tab>
                    <Tab eventKey={3} title="Plan on Reading">
                        <BookList books={willRead} addBook={this.handleAddbook} deleteBook={this.deleteBook}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Library;
