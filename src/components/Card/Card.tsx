import { useState, useEffect } from "react";
import moment from "moment";
import Favorite from "../../assets/img/favorite.png";
import NotFavorite from "../../assets/img/not-favorite.png";
import Time from "../../assets/img/time.png";
import { News } from "../../interfaces/interfaces";

import "./Card.css";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface Props {
  news: News;
  value: any;
  deleteFavorite?: (story_id: number) => void;
}

export const Card = ({ news, value, deleteFavorite }: Props) => {
  const { story_title, created_at, author, story_url, story_id } = news;
  const dataNew = {
    story_title,
    created_at,
    author,
    story_url,
    story_id,
  };

  const [storage, setStorage, findValue, removeValue] = useLocalStorage(
    "fave",
    []
  );

  const [isFavorite, setIsFavorite] = useState(false);

  const changeFavorite = () => {
    const fave = JSON.parse(localStorage.getItem("fave") || "[]");
    const match = fave.find((item: News) => item.story_id === story_id);

    if (!!match) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    changeFavorite();
  }, [isFavorite]);

  const handleFavorite = () => {
    if (story_id === null) {
      return alert("This news does not have a STORY_ID");
    }
    const status = findValue(story_id);
    if (status) {
      removeValue(story_id);
    } else {
      value.push(dataNew);
      setStorage(value);
    }
    setIsFavorite(!isFavorite);
  };

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
              {moment(created_at).startOf("hour").fromNow()} by {author}
            </span>
          </div>
          <h1>{story_title}</h1>
        </a>
      </div>
      <div className="card-button">
        {deleteFavorite ? (
          <img
            id="delete"
            src={Favorite}
            alt=""
            onClick={() => deleteFavorite(story_id)}
          />
        ) : (
          <img
            id="add"
            src={isFavorite ? Favorite : NotFavorite}
            alt=""
            onClick={handleFavorite}
          />
        )}
      </div>
    </div>
  );
};
