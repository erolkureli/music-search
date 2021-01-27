import React from 'react';
import { configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });



import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<SearchForm debug />);
  
    expect(component).toMatchSnapshot();
  });
});
