import React from "react";
import { shallow } from "enzyme";
import { renderHook, act } from "@testing-library/react-hooks";
import moment from "moment";
import { Card } from "../../../components";
import { dataNews } from "../../fixtures/demoNews";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

describe("Card tests", () => {
  const news = {
    story_id: 4,
    created_at: "2021-12-01T20:54:12.000Z",
    author: "brangycastro",
    story_title: "Test notice",
    story_url: "hjadshjsd",
  };

  const deleteFavorite = jest.fn();

  const wrapper = shallow(
    <Card news={news} value={dataNews} deleteFavorite={deleteFavorite} />
  );

  test("should be displayed correctly", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".card").exists()).toBe(true);
  });

  test("should render the new news", () => {
    const title = wrapper.find("h1").text().trim();
    expect(title).toBe(news.story_title);
    const span = wrapper.find("span").text().trim();
    expect(span).toBe(
      `${moment(news.created_at).startOf("hour").fromNow()} by ${news.author}`
    );
  });

  test("should add a news to favorite", () => {
    const wrapper = shallow(<Card news={news} value={dataNews} />);
    wrapper.find("#add").simulate("click");
    const { result } = renderHook(() => useLocalStorage("fave"));
    const [, , find] = result.current;
    let findValue;
    act(() => {
      findValue = find(news.story_id);
    });
    expect(findValue).toBeTruthy();
  });

  test("should delete a news to favorite", () => {
    wrapper.find("#delete").simulate("click");
    const { result } = renderHook(() => useLocalStorage("fave"));
    const [, , , remove] = result.current;
    act(() => {
      remove(news.story_id);
    });
    const storage = JSON.parse(localStorage.getItem("fave") || "[]");
    expect(storage.length).toBe(dataNews.length - 1);
  });
});
