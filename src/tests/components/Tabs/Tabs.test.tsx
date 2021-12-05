import React from "react";
import { mount } from "enzyme";
import { Tabs } from "../../../components";
import { TabsOptions } from "../../../interfaces/interfaces";
import { Alls, Favorite } from "../../../sections";

describe("Tabs tests", () => {
  const tabsOptions: TabsOptions[] = [
    {
      title: "Alls",
      component: <Alls />,
    },
    {
      title: "My Faves",
      component: <Favorite />,
    },
  ];

  const wrapper = mount(<Tabs tabs={tabsOptions} />);

  test("should be displayed correctly", () => {
    expect(wrapper).toMatchSnapshot();
    const selectedDefault = wrapper.find(".selected").text().trim();
    expect(selectedDefault).toBe("Alls");
  });

  test("should be two tabs", () => {
    const tabs = wrapper.find("li");
    expect(tabs).toHaveLength(tabsOptions.length);
  });

  test("should select the My Faves tabs", () => {
    wrapper.find("li").at(1).simulate("click");
    const tabs = wrapper.find("Favorite").exists();
    expect(tabs).toBe(true);
    const tabs1 = wrapper.find("Alls").exists();
    expect(tabs1).toBe(false);
  });
});
