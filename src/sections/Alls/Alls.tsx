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

/**
 * Component to display all news
 * @returns
 */
export const Alls = () => {
  // We initialize our status
  const [data, setData] = useState({
    news: [],
    page: 0,
    loadingFilter: true,
  });

  // We call our hook useLocalStorage because the card requires the favorites data stored in the LocalStorage.
  const [storage] = useLocalStorage("fave", []);
  // We call our hook useLocalStorage to find out if there is a filter stored in the LocalStorage.
  const [storageFilter] = useLocalStorage("lastFilter", "");
  // Hook to perform the infinite scrool
  const [isFetching, setIsFetching] = useScroll(fetchMoreNews);

  useEffect(() => {
    getData(storageFilter);
    return () => {
      setData({ news: [], page: 0, loadingFilter: false });
    };
  }, []);

  /**
   * Function to get the news from the API, this function is only called when the component is rendered for the first time.
   * @param filter
   */
  const getData = async (filter: string) => {
    // Update loadingFilter to true
    setData((old) => ({
      ...old,
      loadingFilter: true,
    }));
    // The function is executed to obtain the data from the API.
    const resp = await searchNews(filter, data.page);
    // We update the state data
    setData((old) => ({
      ...old,
      news: resp?.news,
      page: resp?.page,
      loadingFilter: false,
    }));
  };

  /**
   * Function to get the news from the API, this function is executed when the infinite scroll is performed.
   */
  async function fetchMoreNews() {
    // The function is executed to obtain the data from the API.
    const resp = await searchNews(storageFilter, data.page + 1);
    // We update the state data
    setData((old) => ({
      ...old,
      news: old.news.concat(resp.news),
      page: resp.page,
    }));
    setIsFetching(false);
  }

  const onChange = (e: string) => {
    getData(e);
  };

  return (
    <>
      <Dropdown
        options={options}
        onChange={onChange}
        placeholder={"Select your news"}
      />

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
