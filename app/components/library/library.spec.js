import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import Library from './index';
import BookList from '../common/booklist';

function setUp() {
    const props = {
        bookActions: { addBook: sinon.spy() },
        book: { userBooks: [] }
    };

    return shallow(<Library {...props}/>);
}

describe('Library component', () => {
    
    it('should render 3 BookList', () => {
        const wrapper = setUp();
        console.log(wrapper.debug())
        expect(wrapper.find(BookList).length).to.equal(3);
    });
    

});

