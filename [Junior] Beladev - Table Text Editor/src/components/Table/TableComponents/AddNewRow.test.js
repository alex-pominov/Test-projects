import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddNewRow from './AddNewRow'

configure({adapter: new Adapter()})
describe('<AddNewRow component>', () => {
  let wrapper;

  it('should render 4 elements in a single row', () => {
    const props = {columns: [1, 2, 3]}
    wrapper = shallow(<AddNewRow {...props}/>);
    expect(wrapper.find('td')).toHaveLength(4)  // [1, 2, 3] + колонка Actions с кнопкой Add = 4 элемента
  });
});