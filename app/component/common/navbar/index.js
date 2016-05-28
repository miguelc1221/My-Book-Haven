import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import './styles.scss';

class AppNavBar extends Component {

    logOut() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.props.loggingOut();
        return this.props.router.push('/');
    }

    render() {
        let { location: { pathname } } = this.props;
        let libActive = (pathname === '/library') ? ' activeLink' : "";
        let searchActive = (pathname === '/search') ? ' activeLink' : "";
        let logActive = (pathname === '/login') ? ' activeLink' : "";
        let userLoggedIn;
        if (this.props.appState.isLoggedIn) {
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
                                    onClick={this.logOut.bind(this)}
                                    >
                                    Logout
                                </NavItem>
                            </Nav>

        } else {
            userLoggedIn =  <Nav pullRight>
                                <NavItem
                                    className={'app-navitem' + logActive}
                                    onClick={()=>this.props.router.push('/login')}>
                                    Log in
                                </NavItem>
                            </Nav>
        }
        return (
            <Navbar className='app-navbar'>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Book Manager</Link>
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
        push: PropTypes.func.isRequired
    }),
    isLoggedIn: PropTypes.bool,
    loggingOut: PropTypes.func
}

function mapStateToProps(state) {
    return { appState: state.appState }
}

export default connect(mapStateToProps,actions)(withRouter(AppNavBar));
