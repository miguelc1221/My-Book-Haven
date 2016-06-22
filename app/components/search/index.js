import React, {Component, PropTypes} from 'react';
import {
    Button,
    InputGroup,
    FormGroup,
    FormControl
} from 'react-bootstrap';
import { RingLoader } from 'halogen';
import toastr from 'toastr';
import BookList from '../common/booklist';
import './styles.scss';

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = { book: "" }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.addToHaveRead = this.addToHaveRead.bind(this);
        this.addToRecommended = this.addToRecommended.bind(this);
    }

    handleOnChange(e) {
        this.setState({ book: e.target.value })
    }

    handleOnSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('id_token');
        if (!this.state.book) { return null }
        this.props.bookActions.searchBooks(this.state.book, token)
        this.setState({ book: "" })
    }

    addToHaveRead(book) {
        const { credentials: { email, token } } = this.props.status;
        book.haveRead = true;
        book.recommended = false;
        let bookIdx = this.props.book.userBooks.findIndex((val) => {
            return val.description === book.description;
        });
        if (bookIdx > -1) {
            return toastr.warning('Book already exist in library', null, {"positionClass": "toast-top-left"});
        }
        toastr.success('Book Added', null, {"positionClass": "toast-top-left"});
        this.props.bookActions.addBook(book,email,token);
    }

    addToRecommended(book) {
        const { credentials: { email, token } } = this.props.status;
        book.haveRead = false;
        book.recommended = true;
        let bookIdx = this.props.book.userBooks.findIndex((val) => {
            return val.description === book.description;
        });
        if (bookIdx > -1) {
            return toastr.warning('Book already exist in library', null, {"positionClass": "toast-top-left"});
        }
        toastr.success('Book Added', null, {"positionClass": "toast-top-left"});
        this.props.bookActions.addBook(book,email,token);
    }

    searchList() {
        const { searchBooks } = this.props.book;
        const { searching, searchError } = this.props.status;
        if (searching) {
            return  <div className="divSpinner">
                        <RingLoader className="spinner" color="#4F5E7F" size="40px" />
                    </div>
        } else if (searchError) {
            return  <div className="alert alert-danger searchError">
                        No book matched your search, Please try again.
                    </div>
        } else {
            return <BookList
                        books={searchBooks}
                        addToHaveRead={this.addToHaveRead}
                        addToRecommended={this.addToRecommended}/>
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <FormGroup className="lib-form">
                        <InputGroup>
                            <FormControl type="text" value={this.state.book} placeholder="Title, Author, Publisher, Subject or ISBN" onChange={this.handleOnChange} />
                            <InputGroup.Button>
                                <Button type="submit">Search</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </form>
                { this.searchList() }
            </div>
        );
    }
}

SearchPage.propTypes = {
    status: PropTypes.object,
    book: PropTypes.object,
    bookActions: PropTypes.object
}


export default SearchPage;
