import { useState } from "react";
import { Card } from "../../components";

import { News } from "../../interfaces/interfaces";

export const Favorite = () => {
  const [news, setNews] = useState(
    JSON.parse(localStorage.getItem("fave") || "[]")
  );

  const removeFave = (story_id: number) => {
    const oldData = JSON.parse(localStorage.getItem("fave") || "[]");
    const removeFave = oldData.find((fave: News) => fave.story_id === story_id);

    let index = oldData.indexOf(removeFave);
    oldData.splice(index, 1);
    localStorage.setItem("fave", JSON.stringify(oldData));
    setNews(oldData);
  };

  return (
    <div className="container">
      {news.map((item: News, index: number) => (
        <Card key={index} news={item} handleFave={removeFave} />
      ))}
    </div>
  );
};
