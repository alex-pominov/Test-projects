import React from 'react';
import { configure, shallow } from 'enzyme';
import { Provider } from "react-redux";
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import Table from './Table';
import TableTitle from './TableComponents/TableTitle'
import AddNewRow from './TableComponents/AddNewRow'

const mockStore = configureMockStore({});

configure({adapter: new Adapter()})
describe('<Table /> ', () => {
  let wrapper;

  it('should render table', () => {
    const store = mockStore({});
    wrapper = shallow(
      <Provider store={store}>
        <Table />
      </Provider>
    );
    expect(wrapper.find('table')).toBeTruthy();
    expect(wrapper.find(TableTitle)).toBeTruthy(); //таблица должна содержать заголовок
    expect(wrapper.find(AddNewRow)).toBeTruthy(); //таблица должна содержать тфблицу
  });
});