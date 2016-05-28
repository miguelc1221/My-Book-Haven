import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../app/component/app';

describe('App', () => {
    const wrapper = shallow(<App />)

    it('renders app', () => {
        expect(wrapper.type()).to.eql('div')
    });

})
