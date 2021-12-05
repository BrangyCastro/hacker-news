import React from "react";
import { shallow } from "enzyme";
import { Dropdown } from "../../../components";
import { options } from "../../fixtures/demoOptions";

describe("Dropdown tests", () => {
  const onChange = jest.fn();

  const wrapper = shallow(
    <Dropdown
      options={options}
      placeholder="Select your news"
      onChange={onChange}
    />
  );

  test("should be displayed correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should be three options", () => {
    wrapper.find("#selectField").simulate("click");
    const dropdownMenu = wrapper.find(".options");
    expect(dropdownMenu).toHaveLength(options.length);
    wrapper.find("#selectField").simulate("click");
  });

  test("should select the first option", () => {
    wrapper.find("#selectField").simulate("click");
    wrapper.find(".options").at(0).simulate("click");
    const selectValue = wrapper.find("p").text().trim();
    expect(selectValue).toBe(options[0].value);
  });
});
