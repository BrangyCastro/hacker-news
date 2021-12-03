import { useEffect, useState } from "react";
import { Card } from "../../components";
import { searchNews } from "../../api/news";
import "./Alls.css";

export const Alls = () => {
  const [data, setData] = useState({
    news: [],
    page: 0,
    query: "",
  });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getData();
    return () => {
      setData({ news: [], page: 0, query: "" }); // This worked for me
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreNews();
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  const getData = async () => {
    const resp = await searchNews("", data.page);
    setData((old) => ({
      ...old,
      news: resp?.news,
      page: resp?.page,
      query: resp?.query,
    }));
  };

  const fetchMoreNews = async () => {
    const resp = await searchNews("", data.page + 1);
    setData((old) => ({
      ...old,
      news: old.news.concat(resp?.news),
      page: resp?.page,
      query: resp?.query,
    }));
    setIsFetching(false);
  };

  return (
    <>
      <select name="cars" id="cars">
        <option value="volvo">Angular</option>
        <option value="saab">React</option>
        <option value="mercedes">Vuejs</option>
      </select>

      <div className="container">
        {data.news.map((item: any, index: number) => (
          <Card
            key={index}
            title={item.story_title}
            time={item.created_at}
            autor={item.author}
            favorite={item.favorite}
            story={item.story_url}
          />
        ))}
      </div>
      <div className="loading">
        {isFetching && <span>Fetching more news...</span>}
      </div>
    </>
  );
};
