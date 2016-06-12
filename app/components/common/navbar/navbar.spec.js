import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { AppNavBar } from './index';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

function setUp(isLoggedIn=false, type=shallow) {
    const props = {
        status: { isLoggedIn },
        statusActions: { loggingOut: () => {} },
        router: { push: () => {} },
        location: { pathname: '' }
    };

    return type(<AppNavBar {...props}/>);
}

describe('Navbar component', () => {

    
    it('should render a navbar', () => {
        const wrapper = setUp();
        expect(wrapper.find(Navbar).length).to.equal(1);
        expect(wrapper.find(Navbar.Header).length).to.equal(1);
        expect(wrapper.find(Navbar.Brand).length).to.equal(1);
        expect(wrapper.find(Navbar.Toggle).length).to.equal(1);
        expect(wrapper.find(Navbar.Collapse).length).to.equal(1);
    });
    
    it('should render correct tabs if user is logged in', () => {
        const wrapper = setUp(true); 
        expect(wrapper.containsMatchingElement(
                    <Nav pullRight>
                        <NavItem>
                            Search Books
                        </NavItem>
                        <NavItem>
                            Library
                        </NavItem>
                        <NavItem>
                            Logout
                        </NavItem>
                    </Nav>
        )).to.equal(true);
    });

    it('should render correct tabs if user is logged Out', () => {
        const wrapper = setUp();
        expect(wrapper.containsMatchingElement(
                    <Nav pullRight>
                        <NavItem>
                            Log In
                        </NavItem>
                    </Nav>
        )).to.equal(true);
    });

    
    it('should pass logOut to NavItem', () => {
        const wrapper = setUp(true);
        const navItem = wrapper.findWhere((n) => n.type() === NavItem && n.contains('Logout'))
        const logOut = wrapper.instance().logOut;
        expect(navItem.prop('onClick')).to.equal(logOut);
    });

    
    it('should handle onClick', () => {
        const navClick = sinon.spy();
        const wrapper = mount(<NavItem onClick={navClick}/>)
        wrapper.find('a').simulate('click');
        expect(navClick.calledOnce).to.equal(true);
    });
    
    
});
