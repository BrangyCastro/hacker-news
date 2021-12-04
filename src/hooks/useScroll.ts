import { useEffect, useState } from "react";
import { searchNews } from "../api/news";

interface Props {
  filter: string;
  page: number;
  setData: React.Dispatch<
    React.SetStateAction<{
      news: never[];
      page: number;
      loadingFilter: boolean;
    }>
  >;
}

export const useScroll = ({ filter, page, setData }: Props) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreNews();
  }, [isFetching]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  const fetchMoreNews = async () => {
    const resp = await searchNews(filter, page);
    setData((old) => ({
      ...old,
      news: old.news.concat(resp.news),
      page: resp.page,
    }));
    setIsFetching(false);
  };

  return [isFetching] as const;
};
