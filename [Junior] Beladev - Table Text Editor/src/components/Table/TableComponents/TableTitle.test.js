import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TableTitle from './TableTitle'

configure({adapter: new Adapter()})
describe('<TableTitle component>', () => {
  let wrapper;

  it('should render three columns [th]', () => {
    const props = {columns: [1, 2]}
    wrapper = shallow(<TableTitle {...props}/>);
    expect(wrapper.find('th')).toHaveLength(3)  // [1, 2] + колонка Actions
  });
});