import axios from "axios";

export const searchNews = async (query?: string, page?: number) => {
  const url = `https://hn.algolia.com/api/v1/search_by_date?query=${query?.toLocaleLowerCase()}&page=${page}`;

  try {
    const response = await axios.get(url);
    return {
      news: response.data.hits,
      page: response.data.page,
      query: response.data.query,
    };
  } catch (error) {
    console.log(error);
    return {
      news: [],
      page: 0,
      query: "",
      error: true,
    };
  }
};
