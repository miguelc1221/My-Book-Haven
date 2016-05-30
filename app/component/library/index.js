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
        const { addBook } = this.props.userActions;
        return addBook(book,email,token)
    }

    render() {
        const { userActions: { addBook }, user: { userBooks } } = this.props;
        let read = userBooks.filter((val) => {
            return val.read;
        });
        let planToRead = userBooks.filter((val) => {
            return val.planToRead;
        });
                    console.log(userBooks)

        return (
            <div className="container">
                <Tabs defaultActiveKey={1} id="controlled-tab-example">
                    <Tab eventKey={1} title="All">
                        <BookList books={userBooks} addBook={this.handleAddbook} />
                    </Tab>
                    <Tab eventKey={2} title="Read">
                        <BookList books={read} addBook={this.handleAddbook} />
                    </Tab>
                    <Tab eventKey={3} title="Plan on Reading">
                        <BookList books={planToRead} addBook={this.handleAddbook} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Library;
