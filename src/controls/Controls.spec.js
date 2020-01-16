// Test away!

import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import { render, fireEvent, act } from '@testing-library/react';
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import Dashboard, {toggleClosed, toggleLocked} from '../dashboard/Dashboard.js';
import Controls from './Controls.js';

configure({ adapter: new Adapter() });


describe("Gate cannot be closed or opened if it is locked", ()=>{

  test("Gate cannot be closed", ()=>{
    const wrapper = render(<Controls locked={true} />);
    const { getByText, findByText } = wrapper;
    // const testClosed = wrapper.click(getByText("Unlock Gate"));
    // let closed = wrapper.matchesElement(<button className="toggle-btn" disabled={true}>Unlock Gate</button>);
    act(() => {
      fireEvent.click(getByText("Unlock Gate"));
    })
    const closed = wrapper.getByText(/Unlock Gate/i);
    // const closed2 = wrapper.getByText(/lock Gate/i)
    expect(closed.disabled).toBe(true);
    // expect(closed2.disabled).toBe(false);
  })

})

describe("Can you toggle the states of closed and locked", ()=>{


  test("can you toggle open and close when it isnt locked", ()=>{
    const wrapper = render(<Dashboard locked={false} closed={false} />);
    const { getByText, findByText } = wrapper;
    //click once to see if the status changes
    act(() =>{
      fireEvent.click(getByText('Close Gate', {exact: true}));
    })

    const closed = wrapper.getByText('Open Gate', {exact: true});

    expect(closed).toBeInTheDocument();

    //see if you click it again if it reverts to the original status
    act(() =>{
      fireEvent.click(getByText('Open Gate', {exact: true}));
    })

    const closed2 = wrapper.getByText('Close Gate', {exact: true});

    expect(closed2).toBeInTheDocument();
  })

  test("can you toggle locked when it isnt locked", ()=>{
    const wrapper = render(<Controls locked={false} closed={true} toggleLocked={toggleLocked} toggleClosed={toggleClosed} />);
    const { getByText, findByText } = wrapper;
    //click once to see if the status changes
    act(() =>{
      fireEvent.click(getByText('Lock Gate', {exact: true}));
    })

    let locked = wrapper.getByText('Unlock Gate', {exact: true});

    // expect(wrapper.getByText('Unlock Gate', {exact: true})).toBeInTheDocument();

    //see if you click it again if it reverts to the original status
    // act(() =>{
    //   fireEvent.click(getByText('Unlock Gate', {exact: true}));
    // })
    //
    // const locked2 = wrapper.getByText('Lock Gate', {exact: true});

    // expect(locked2).toBeInTheDocument();
  })
})
