import React, { Component, PropTypes } from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './styles.scss';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = { showDetails: false }

        this.OnDetailsClick = this.OnDetailsClick.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.addHaveRead = this.addHaveRead.bind(this);
        this.addRecommended = this.addRecommended.bind(this);
    }

    OnDetailsClick() {
        this.setState({ showDetails: !this.state.showDetails })
    }

    contentShow() {
        const { image, description, publisher, pages, date, preview } = this.props.book;
        const imageUrl = (image) ? image : "../img/Book_cover_not_available.jpg";
        if (this.state.showDetails) {
            return <div className='book-content' key={1}>
                        <p className='book-detail'>

                            {(description) ? description.slice(0,200) + "..." : description}
                        </p>
                        <div className="book-info">
                            <p>{date}</p>
                            <p>{publisher}</p>
                            <p>{pages} pages</p>
                        </div>
                    </div>
        } else {
            return <div className='book' key={2}>
                        <div className='book-img' style={{'backgroundImage': `url(${imageUrl})`}}></div>
                        <div className='book-links'>
                            <a href={preview} target='blank'>preview</a>
                            <a onClick={this.OnDetailsClick}>details</a>
                        </div>
                    </div>
        }
    }

    removeButton() {
        if (this.props.deleteBook) {
            return  <Button
                        className="remove"
                        onClick={this.deleteBook}
                        bsStyle="danger">
                        <Glyphicon glyph="remove" />
                            Remove
                    </Button>
        }
        return null;
    }

    haveReadButton() {
        if (this.props.addToHaveRead) {
            return  <Button
                        className="app-book-button"
                        bsStyle="primary"
                        onClick={this.addHaveRead}>
                        <Glyphicon glyph="plus" />
                            Have Read
                    </Button>
        }
        return null;
    }

    recommendedButton() {
        if (this.props.addToRecommended) {
            return  <Button
                        className="app-book-button"
                        bsStyle="primary"
                        onClick={this.addRecommended}>
                        <Glyphicon glyph="plus" />
                            Recommended
                    </Button>
        }
        return null;
    }

    deleteBook() {
        return this.props.deleteBook(this.props.book);
    }

    addHaveRead(){
        return this.props.addToHaveRead(this.props.book)
    }

    addRecommended() {
        return this.props.addToRecommended(this.props.book)
    }

    render() {
        const { title, author } = this.props.book;
        const { addToRecommended, addToHaveRead } = this.props;
        const { showDetails } = this.state;

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
                            { this.contentShow() }
                    </ReactCSSTransitionGroup>
                    <figcaption>
                        <h2>{title}</h2>
                        <p>{author}</p>
                        { this.haveReadButton() }
                        { this.recommendedButton() }
                        { this.removeButton() }
                    </figcaption>
                </div>
            </figure>
        );
    }
}

Book.propTypes = {
    deleteBook: PropTypes.func,
    addToHaveRead: PropTypes.func,
    addToRecommended: PropTypes.func,
    book: PropTypes.object.isRequired
}

export default Book;
