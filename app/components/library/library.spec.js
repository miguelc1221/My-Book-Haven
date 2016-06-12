import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import Library from './index';
import { Tabs, Tab } from 'react-bootstrap';

function setUp() {
    const props = {
        bookActions: { addBook: sinon.spy() },
        book: { userBooks: [] }
    };

    return shallow(<Library {...props}/>);
}

describe('Library component', () => {


});
