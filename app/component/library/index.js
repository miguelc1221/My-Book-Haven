import React, { Component, PropTypes } from 'react';
import BookList from '../common/booklist';
import { Tabs, Tab } from 'react-bootstrap';

class Library extends Component {
    render() {
        const { addBook, appState: { userBooks } } = this.props;
        let read = userBooks.filter((val) => {
            return val.read;
        });
        let planToRead = userBooks.filter((val) => {
            return val.planToRead;
        });
        return (
            <div>
                <Tabs defaultActiveKey={1} id="controlled-tab-example">
                    <Tab eventKey={1} title="All">
                        <BookList books={userBooks} addBook={addBook} />
                    </Tab>
                    <Tab eventKey={2} title="Read">
                        <BookList books={read} addBook={addBook} />
                    </Tab>
                    <Tab eventKey={3} title="Plan on Reading">
                        <BookList books={planToRead} addBook={addBook} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Library;
