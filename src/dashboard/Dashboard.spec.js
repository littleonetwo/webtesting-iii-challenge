// Test away

import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import Dashboard from './Dashboard.js';
import Controls from '../controls/Controls.js';
import Display from '../display/Display.js';

configure({ adapter: new Adapter() });

describe("Gate defaults to unlocked and opened", ()=>{
  const wrapper = shallow(<Dashboard />);

  test("Gate is unlocked by default", ()=>{
    const locked = wrapper.state('locked');

    expect(locked).toBe(false);

  })

  test("Gate is opened by default", ()=>{
    const closed = wrapper.state('closed');

    expect(closed).toBe(false);
  })

})

describe("Make sure both controls and display are in the DOM", () =>{

  test("Controls is displaying", ()=>{
    const wrapper = shallow(<Controls />);
    const control = wrapper.find('.controls.panel').exists();

    expect(control).toBe(true);
  })

  test("Display is displaying", ()=>{
      const wrapper = shallow(<Display />);
      const display = wrapper.find('.display.panel').exists();

      expect(display).toBe(true);
  })

})
