import React, { Component, PropTypes } from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './styles.scss';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = { showDetails: false }
    }
    handleOnDetailsClick() {
        this.setState({ showDetails: !this.state.showDetails })
    }
    addReadBook() {
        let books = this.props.BookObj;
        books.read = true;
        books.planToRead = false;
        return this.props.addBook(books)
    }
    addPlanToRead() {
        let book = this.props.BookObj;
        books.read = false;
        books.planToRead = true;
        return this.props.addBook(book)
    }
    render() {
        const { image, description, publisher, pages, date, preview, title, author } = this.props.BookObj;
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
                                    <a onClick={this.handleOnDetailsClick.bind(this)}>details</a>
                                </div>
                            </div>
        }
        return (
            <figure className={ showDetails ? 'figure-background' : null }>
                <div
                    className={ showDetails ? 'details-exit' : 'hidden'}
                    onClick={this.handleOnDetailsClick.bind(this)}>
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
                        <Button onClick={this.addReadBook.bind(this)}>Read</Button>
                        <Button onClick={this.addPlanToRead.bind(this)}>Future Read</Button>
                    </figcaption>
                </div>
            </figure>
        )
    }
}

export default Book
