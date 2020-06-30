import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VisitorList from './VisitorList.jsx';

configure({ adapter: new Adapter() });

describe('VisitorList', () => {

  const visitorsJson = [
    {id: 1, first_name: "Test", last_name: "User", notes: "got here early"},
    {id: 2, first_name: "Second", last_name: "Person", notes: "not first", signed_out: "2020-06-20"},    
  ];

  const visitorList = shallow(<VisitorList visitors={visitorsJson}/>);

  test('Visitor list renders all visitors', () => {
    expect(visitorList.find('tbody').find('tr').length).toEqual(2);
    expect(visitorList.text()).toContain('got here early');    
  });


  test('renders only one signout button for visitor who hasnt signed out', () => {
    expect(visitorList.find('SignoutButton').length).toEqual(1);
  });
});
