import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as statusActions from '../../../actions/statusActions';

import './styles.scss';

export class AppNavBar extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
    }
    logOut() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.props.statusActions.loggingOut();
        return this.props.router.push('/');
    }

    render() {
        let { location: { pathname } } = this.props;
        let libActive = (pathname === '/library') ? ' activeLink' : "";
        let searchActive = (pathname === '/search') ? ' activeLink' : "";
        let logActive = (pathname === '/login') ? ' activeLink' : "";
        let userLoggedIn;
        if (this.props.status.isLoggedIn) {
            userLoggedIn =  <Nav pullRight>
                                <NavItem
                                    className={'app-navitem' + searchActive }
                                    onClick={()=>this.props.router.push('/search')}>
                                    Search Books
                                </NavItem>
                                <NavItem
                                    className={'app-navitem' + libActive }
                                    onClick={()=>this.props.router.push('/library')}>
                                    Library
                                </NavItem>
                                <NavItem
                                    className='app-navitem'
                                    onClick={this.logOut}
                                    >
                                    Logout
                                </NavItem>
                            </Nav>

        } else {
            userLoggedIn =  <Nav pullRight>
                                <NavItem
                                    className={'app-navitem' + logActive}
                                    onClick={()=>this.props.router.push('/login')}>
                                    Log In
                                </NavItem>
                            </Nav>
        }
        return (
            <Navbar className='app-navbar'>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">My Book Haven</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    { userLoggedIn }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

AppNavBar.propTypes = {
    router: PropTypes.shape({
        push: PropTypes.func
    }),
    location: PropTypes.object,
    status: PropTypes.object.isRequired,
    statusActions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { status: state.status }
}

function mapDispatchToProps(dispatch) {
    return { statusActions: bindActionCreators(statusActions, dispatch) }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AppNavBar));
