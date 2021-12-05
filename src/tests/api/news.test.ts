import React from "react";
import { searchNews } from "../../api/news";

describe("Try the news fetch", () => {
  test("should request the news from reactjs", async () => {
    const resp = await searchNews("reactjs");
    expect(resp.news.length).toBe(20);
    expect(resp.query).toBe("reactjs");
  });

  test("should request the news of reactjs on page 1", async () => {
    const resp = await searchNews("reactjs", 1);
    expect(resp.page).toBe(1);
  });
});
