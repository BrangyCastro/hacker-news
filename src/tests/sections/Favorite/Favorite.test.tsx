import React from "react";
import { mount, shallow } from "enzyme";
import { Favorite } from "../../../sections";
import { dataNews } from "../../fixtures/demoNews";
import { act } from "@testing-library/react";

describe("Test section favorite", () => {
  const wrapper = shallow(<Favorite />);

  test("should display correctly without news", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text().trim()).toBe(
      "You don't have any favorite news"
    );
  });

  test("should display correctly with news", () => {
    localStorage.setItem("fave", JSON.stringify(dataNews));
    const wrapper = mount(<Favorite />);
    expect(wrapper.find("Card").exists()).toBe(true);
  });

  test("should be three news", () => {
    localStorage.setItem("fave", JSON.stringify(dataNews));
    const wrapper = mount(<Favorite />);
    const card = wrapper.find("Card");
    expect(card).toHaveLength(dataNews.length);
  });

  test("should delete a news to favorite", () => {
    localStorage.setItem("fave", JSON.stringify(dataNews));
    const wrapper = mount(<Favorite />) as any;
    act(() => {
      wrapper.find("Card").at(0).prop("deleteFavorite")(dataNews[0].story_id);
    });
    const storage = JSON.parse(localStorage.getItem("fave") || "[]");
    expect(storage.length).toBe(dataNews.length - 1);
  });
});
