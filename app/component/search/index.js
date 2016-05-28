import React, {Component, PropTypes} from 'react';
import {
    Button,
    InputGroup,
    FormGroup,
    FormControl
} from 'react-bootstrap';
import { RingLoader } from 'halogen';
import BookList from '../common/booklist';
import './styles.scss';

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = { book: "" }
    }
    handleOnChange(e) {
        this.setState({ book: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('id_token');
        if (!this.state.book) { return null }
        this.props.searchBooks(this.state.book, token)
        this.setState({ book: "" })
    }
    render() {
        const { addBook } = this.props;
        const { searching, searchError, searchBooks } = this.props.appState;
        let searchList;
        if (searching) {
            searchList = <div className="divSpinner">
                            <RingLoader className="spinner" color="#4F5E7F" size="40px" />
                        </div>
        } else if (searchError) {
            searchList = <div className="alert alert-danger searchError">No book matched your search, Please try again.</div>
        } else {
            searchList = <BookList books={searchBooks} addBook={addBook}/>
        }
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <FormGroup className="lib-form">
                        <InputGroup>
                            <FormControl type="text" value={this.state.book} placeholder="Book or Author" onChange={this.handleOnChange.bind(this)} />
                            <InputGroup.Button>
                                <Button type="submit">Search</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </form>
                { searchList }
            </div>
        );
    }
}

SearchPage.propTypes = {
    searchBooks: PropTypes.func,
    searching: PropTypes.bool,
    searchingError: PropTypes.bool,
    addBook: PropTypes.func
}


export default SearchPage;
