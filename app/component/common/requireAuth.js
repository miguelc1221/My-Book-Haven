import React, { Component, PropTypes } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
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
            if (!this.props.user.isLoggedIn) {
                if (token) {
                    this.props.userActions.isTokenValid(email,token);
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
            user: state.user,
            status: state.status
        }
    }

    function mapDispatchToProps(dispatch) {
        return {
            userActions: bindActionCreators(userActions, dispatch),
            statusActions: bindActionCreators(statusActions, dispatch)
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(Authentication));
}
