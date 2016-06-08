import React, { Component, PropTypes } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookActions from '../../actions/bookActions';
import * as statusActions from '../../actions/statusActions';

export default function (ComposedComponent) {

    class Authentication extends Component {

        componentWillMount() {
            const token = localStorage.getItem('id_token');
            const profile = localStorage.getItem('profile');
            const email = JSON.parse(profile);
            // if user is not loggedIn
            // if there is a token, check if valid, if not valid push home
            // if no token, push home
            if (!this.props.status.isLoggedIn) {
                if (token) {
                    this.props.bookActions.isTokenValid(email,token);
                } else {
                    this.props.router.push('/');
                }
            }
        }
        render () {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }

    function mapStateToProps(state) {
        return {
            book: state.book,
            status: state.status
        }
    }

    function mapDispatchToProps(dispatch) {
        return {
            bookActions: bindActionCreators(bookActions, dispatch),
            statusActions: bindActionCreators(statusActions, dispatch)
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(Authentication));
}
