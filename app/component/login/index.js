import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookActions from '../../actions/bookActions';

import './styles.scss';

class Login extends Component {

    componentDidMount() {
        this.lock = new Auth0Lock('BjlDBoIyhcstbiblQiyiV3g1vd8xffhR', 'miguelc1221.auth0.com');

        this.login()
    }

    login() {
        // Show the Auth0 Lock widget
        this.lock.show({container: 'auth0-form'}, (err, profile, token) => {
            if (err) {
                alert(err);
                return;
            }
            // If authentication is successful, save the items
            // in local storage
            localStorage.setItem('profile', JSON.stringify(profile.email));
            localStorage.setItem('id_token', token);

            this.props.bookActions.findOrCreateUser(profile.email,token);
        });
    }
    render () {
        return (
            <div className='auth0-form-wrapper'>
                <div id='auth0-form'></div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return { bookActions: bindActionCreators(bookActions, dispatch) }
}

export default connect(null,mapDispatchToProps)(withRouter(Login));
