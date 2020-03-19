import React from 'react';
import { configure, shallow } from 'enzyme';
import { Provider } from "react-redux";
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import TextPresentation from './TextPresentation';

const mockStore = configureMockStore({});

configure({adapter: new Adapter()})
describe('<TextPresentation /> ', () => {
  let wrapper;

  it('should render <TextPresentation /> which contain textarea', () => {
    const store = mockStore({});
    wrapper = shallow(
      <Provider store={store}>
        <TextPresentation />
      </Provider>
    );
    expect(wrapper.find('textarea')).toBeTruthy();
  });
});