import { expect  } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Home from './index';
import { Jumbotron, Grid } from 'react-bootstrap';

describe('home component', () => {
    const wrapper = shallow(<Home />);

    it('should contain a jumbotron and a grid', () => {
        expect(wrapper.find(Jumbotron).length).to.equal(1);
        expect(wrapper.find(Grid).length).to.equal(1);
    });
    
});
