import React, { Component, PropTypes } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import * as actions from '../../actions';

export default function (ComposedComponent) {

    class Authentication extends Component {

        componentWillMount() {
            const token = localStorage.getItem('id_token');
            const profile = localStorage.getItem('profile');
            const email = JSON.parse(profile);
            // if user is not loggedIn
            // if there is a token, check if valid, if not valid push home
            // if no token, push home
            if (!this.props.appState.isLoggedIn) {
                if (token) {
                    this.props.isAuthenticated(email,token);
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
        return { appState: state.appState }
    }

    return connect(mapStateToProps, actions)(withRouter(Authentication));
}
