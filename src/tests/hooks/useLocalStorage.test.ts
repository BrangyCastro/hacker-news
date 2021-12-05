import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { dataNews } from "../fixtures/demoNews";

const TEST_KEY = "key";
const TEST_VALUE = { lastFilter: "reactjs" };

describe("Test useLocalStorage", () => {
  test("should set localStorage with default value", () => {
    renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE));
    const storage = JSON.parse(localStorage.getItem(TEST_KEY) || "");
    expect(storage).toEqual(TEST_VALUE);
  });

  test("should set the default value from localStorage if it exists", () => {
    localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE));
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, ""));
    const [value] = result.current;
    expect(value).toEqual(TEST_VALUE);
    const storage = JSON.parse(localStorage.getItem(TEST_KEY) || "");
    expect(storage).toEqual(TEST_VALUE);
  });

  test("should update localStorage when state changes ", () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE));
    const [, setValue] = result.current;

    const newValue = { lastFilter: "angular" };
    act(() => {
      setValue(newValue);
    });

    const storage = JSON.parse(localStorage.getItem(TEST_KEY) || "");
    expect(storage).toEqual(newValue);
  });

  test("should remove an element from localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("favorite", dataNews));
    const [value, , , remove] = result.current;
    act(() => {
      remove(value[0].story_id);
    });
    const storage = JSON.parse(localStorage.getItem("favorite") || "");
    expect(storage.length).toBe(dataNews.length - 1);
  });

  test("should look for an element of the localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("favorite", dataNews));
    const [value, , find] = result.current;
    let findValue;
    act(() => {
      findValue = find(value[1].story_id);
    });
    expect(findValue).toBeTruthy();
  });
});
