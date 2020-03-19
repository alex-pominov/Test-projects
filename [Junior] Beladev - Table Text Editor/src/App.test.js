import React from 'react';
import { configure, shallow } from 'enzyme';
import { Provider } from "react-redux";
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import App from './App';

import Table from './components/Table/Table';
import TextPresentation from './components/TextPresentation/TextPresentation';


const mockStore = configureMockStore({});

configure({adapter: new Adapter()});
describe('<Table /> ', () => {
  let wrapper;

  it('should render table', () => {
    const store = mockStore({isViewTypeTable : false});
    wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('container')).toBeTruthy();
    expect(wrapper.find(Table)).toBeTruthy(); 
    expect(wrapper.find(TextPresentation)).toBeTruthy(); 
  });
});