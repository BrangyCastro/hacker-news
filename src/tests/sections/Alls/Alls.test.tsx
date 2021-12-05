import React from "react";
import { shallow } from "enzyme";
import { Alls } from "../../../sections";
import { dataNews } from "../../fixtures/demoNews";

describe("Test section alls news", () => {
  test("should display correctly without news", () => {
    const myInitialState = {
      news: [],
      page: 0,
      loadingFilter: true,
    };
    React.useState = jest.fn().mockReturnValue([myInitialState, {}]);
    const wrapper = shallow(<Alls />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text().trim()).toBe("Loading news...");
  });

  test("should display correctly with news", () => {
    const myInitialState = {
      news: dataNews,
      page: 0,
      loadingFilter: false,
    };
    React.useState = jest.fn().mockReturnValue([myInitialState, {}]);
    const wrapper = shallow(<Alls />);
    expect(wrapper.find("Card").exists()).toBe(true);
  });

  test("should be three news", () => {
    const myInitialState = {
      news: dataNews,
      page: 0,
      loadingFilter: false,
    };
    React.useState = jest.fn().mockReturnValue([myInitialState, {}]);
    const wrapper = shallow(<Alls />);
    const card = wrapper.find("Card");
    expect(card).toHaveLength(dataNews.length);
  });
});
