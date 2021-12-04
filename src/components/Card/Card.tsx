import { useState, useEffect } from "react";
import Favorite from "../../assets/img/favorite.png";
import NotFavorite from "../../assets/img/not-favorite.png";
import Time from "../../assets/img/time.png";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { News } from "../../interfaces/interfaces";

import "./Card.css";

interface Props {
  news: News;
  changeFave?: boolean;
  handleFave: (story_id: number, dataNew: News) => void;
}

export const Card = ({ news, changeFave, handleFave }: Props) => {
  const { story_title, created_at, author, story_url, story_id } = news;
  const dataNew = {
    story_title,
    created_at,
    author,
    story_url,
    story_id,
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const fave = () => {
    const fave = JSON.parse(localStorage.getItem("fave") || "[]");
    const match = fave.find((item: News) => item.story_id === story_id);

    if (!!match) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    fave();
  }, [changeFave]);

  return (
    <div className="card">
      <div className="card-body">
        <a
          href={story_url == null ? "" : story_url}
          target="_blank"
          rel="noreferrer"
        >
          <div className="time">
            <img src={Time} alt="" />
            <span>
              {created_at} by {author}
            </span>
          </div>
          <h1>{story_title}</h1>
        </a>
      </div>
      <div className="card-button">
        <img
          src={isFavorite ? Favorite : NotFavorite}
          alt=""
          onClick={() => handleFave(story_id, dataNew)}
        />
      </div>
    </div>
  );
};
