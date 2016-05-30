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
        this.props.userActions.searchBooks(this.state.book, token)
        this.setState({ book: "" })
    }
    handleAddbook(book) {
        const token = localStorage.getItem('id_token');
        const profile = localStorage.getItem('profile');
        const email = JSON.parse(profile);
        const { addBook } = this.props.userActions;
        return addBook(book,email,token)
    }
    render() {
        const { searchBooks } = this.props.user;
        const { searching, searchError } = this.props.status;
        let searchList;
        if (searching) {
            searchList = <div className="divSpinner">
                            <RingLoader className="spinner" color="#4F5E7F" size="40px" />
                        </div>
        } else if (searchError) {
            searchList = <div className="alert alert-danger searchError">No book matched your search, Please try again.</div>
        } else {
            searchList = <BookList books={searchBooks} addBook={this.handleAddbook.bind(this)}/>
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
    status: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
}


export default SearchPage;
