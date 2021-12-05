import { useEffect, useState } from "react";
import { Card, Dropdown } from "../../components";
import { searchNews } from "../../api/news";
import "./Alls.css";
import { News } from "../../interfaces/interfaces";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Angular from "../../assets/img/angular.png";
import Reactjs from "../../assets/img/reactjs.png";
import Vuejs from "../../assets/img/vuejs.png";
import { useScroll } from "../../hooks/useScroll";

const dataNews = [
  {
    story_id: 1,
    created_at: "2021-12-01T20:55:29.000Z",
    author: "salsakran",
    story_title: "Ask HN: Who is hiring? (December 2021)",
    story_url: "hjadshjsd",
  },
  {
    story_id: 2,
    created_at: "2021-12-01T20:54:46.000Z",
    author: "nomeq",
    story_title: "Ask HN: Freelancer? Seeking freelancer? (December 2021)",
    story_url: "hjadshjsd",
  },
  {
    story_id: 3,
    created_at: "2021-12-01T20:54:12.000Z",
    author: "mynameisjody",
    story_title: "Ask HN: Who is hiring? (December 2022)",
    story_url: "hjadshjsd",
  },
];

const options = [
  {
    label: "Angular",
    value: "Angular",
    icon: Angular,
  },
  {
    label: "Reactjs",
    value: "Reactjs",
    icon: Reactjs,
  },
  {
    label: "Vuejs",
    value: "Vuejs",
    icon: Vuejs,
  },
];

export const Alls = () => {
  const [data, setData] = useState({
    news: [],
    page: 0,
    loadingFilter: false,
  });

  const [storage] = useLocalStorage("fave", []);
  const [storageFilter] = useLocalStorage("lastFilter", "");
  const [isFetching] = useScroll({
    filter: storageFilter,
    page: data.page + 1,
    setData: setData,
  });

  useEffect(() => {
    getData(storageFilter);
    return () => {
      setData({ news: [], page: 0, loadingFilter: false });
    };
  }, []);

  const getData = async (filter: string) => {
    setData((old) => ({
      ...old,
      loadingFilter: true,
    }));
    const resp = await searchNews(filter, data.page);
    setData((old) => ({
      ...old,
      news: resp?.news,
      page: resp?.page,
      loadingFilter: false,
    }));
  };

  const onChange = (e: string) => {
    getData(e);
  };

  return (
    <>
      <Dropdown options={options} onChange={onChange} />

      {data.loadingFilter ? (
        <h1 className="loading">Loading news...</h1>
      ) : (
        <>
          <div className="container">
            {data.news.map((item: News, index: number) => (
              <Card key={index} news={item} value={storage} />
            ))}
          </div>
          <div className="loading">
            {isFetching && <span>Fetching more news...</span>}
          </div>
        </>
      )}
    </>
  );
};
