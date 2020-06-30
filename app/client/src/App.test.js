import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App.js';
import VisitorList from './components/VisitorList.jsx';

configure({ adapter: new Adapter() });

describe('App', () => {
    test('App renders page title and VisitorList', () => {
        const app = shallow(<App/>);
      
        expect(app.find('p').text()).toEqual('Welcome to Cool Chip!');
        expect(app.find('VisitorList').length).toEqual(1);
      });
});
