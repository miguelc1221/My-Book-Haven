import React, { Component, PropTypes } from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './styles.scss';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = { showDetails: false }

        this.OnDetailsClick = this.OnDetailsClick.bind(this);
        this.addToHaveRead = this.addToHaveRead.bind(this);
        this.addToRecommended = this.addToRecommended.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }
    OnDetailsClick() {
        this.setState({ showDetails: !this.state.showDetails })
    }
    addToHaveRead() {
        let book = this.props.book;
        book.haveRead = true;
        book.recommended = false;
        this.props.addBook(book)
    }
    addToRecommended() {
        let book = this.props.book;
        book.haveRead = false;
        book.recommended = true;
        this.props.addBook(book)
    }
    deleteBook() {
        let book = this.props.book;
        this.props.deleteBook(book);
    }
    render() {
        const { image, description, publisher, pages, date, preview, title, author } = this.props.book;
        const { showDetails } = this.state;
        const imageUrl = (image) ? image : "../img/Book_cover_not_available.jpg";
        let contentShow;
        if (showDetails) {
            contentShow =   <div className='book-content' key={1}>
                                <p className='book-detail'>
                                    {(description.length > 179) ? description.slice(0,179) + "..." : description}
                                </p>
                                <div className="book-info">
                                    <p>{date}</p>
                                    <p>{publisher}</p>
                                    <p>{pages} pages</p>
                                </div>
                            </div>
        } else {
            contentShow =   <div className='book' key={2}>
                                <div className='book-img' style={{'backgroundImage': `url(${imageUrl})`}}></div>
                                <div className='book-links'>
                                    <a href={preview} target='blank'>preview</a>
                                    <a onClick={this.OnDetailsClick}>details</a>
                                </div>
                            </div>
        }
        let deleteButton;
        if (this.props.deleteBook) {
            deleteButton = <Button onClick={this.deleteBook} bsStyle="danger">Delete</Button>
        } else {
            deleteButton = null;
        }
        return (
            <figure className={ showDetails ? 'figure-background' : null }>
                <div
                    className={ showDetails ? 'details-exit' : 'hidden'}
                    onClick={this.OnDetailsClick}>
                    <Glyphicon glyph="remove" />
                </div>
                <div className='figure-content'>
                    <ReactCSSTransitionGroup
                        transitionName='content'
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        { contentShow }
                   </ReactCSSTransitionGroup>
                    <figcaption>
                        <h2>{title}</h2>
                        <p>{author}</p>
                        <Button className="app-book-button" bsStyle="primary" onClick={this.addToHaveRead}>Have Read</Button>
                        <Button className="app-book-button" bsStyle="primary" onClick={this.addToRecommended}>Recommended</Button>
                        { deleteButton }
                    </figcaption>
                </div>
            </figure>
        )
    }
}

export default Book
