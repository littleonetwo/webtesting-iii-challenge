// Test away!
import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import { render, fireEvent, act } from '@testing-library/react';
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

// import Dashboard from './Dashboard.js';
// import Controls from './Controls.js';
import Display from './Display.js';

configure({ adapter: new Adapter() });


describe("Display is correctly displaying open/close, locked/unlocked", ()=>{


  test("is correctly displaying open/close", ()=>{
    const wrapper = render(<Display />);
    const closed1 = wrapper.getByText(/Open/i);
    // const closed2 = wrapper.getByText(/Closed/i);

    expect(closed1).toBeInTheDocument();

    const wrapper2 = render(<Display closed={true} />);
    const closed2 = wrapper2.getByText(/Closed/i);

    expect(closed2).toBeInTheDocument();

  })

  test("is correctly displaying locked/unlocked", ()=>{
    const wrapper = render(<Display />);
    const locked = wrapper.getByText(/unlocked/i);

    expect(locked).toBeInTheDocument();

    const wrapper2 = render(<Display locked={true} />);
    const locked2 = wrapper2.getByText('Locked', {exact: true});

    expect(locked2).toBeInTheDocument();
  })
})

describe("Display is assigning the correct class names", ()=>{

  test("when locked or closed use the red-led class", ()=>{
    const wrapper= shallow(<Display locked={true} closed={true} />);
    const closed = wrapper.find('.green-led').exists();
    const closed2 = wrapper.find('.red-led').exists();

    //closed should be false because it doesnt exist closed2 should be true because it should
    expect(closed2).toBe(true);
    expect(closed).toBe(false);

  })
  //By default it should be unlocked and open so no need to pass props.
  test("when unlocked or open use the green-led class", ()=>{
    const wrapper= shallow(<Display />);
    const locked = wrapper.find('.green-led').exists();
    const locked2 = wrapper.find('.red-led').exists();

    //locked should be true because it exists locked 2 should be false because it shouldnt
    expect(locked).toBe(true);
    expect(locked2).toBe(false);
  })


})
