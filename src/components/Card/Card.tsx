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

/**
 * Component for rendering the Card
 * @param Props
 * @returns
 */
export const Card = ({ news, value, deleteFavorite }: Props) => {
  // We destroy the news
  const { story_title, created_at, author, story_url, story_id } = news;
  const dataNew = {
    story_title,
    created_at,
    author,
    story_url,
    story_id,
  };

  // We call our hook useLocalStorage
  const [, setStorage, findValue, removeValue] = useLocalStorage("fave", []);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    changeFavorite();
  }, [isFavorite]);
  /**
   * With this function we check when the card should be marked as favorite.
   */
  const changeFavorite = () => {
    // We look in the list of favorites if this news is found, and mark it as a favorite.
    const fave = JSON.parse(localStorage.getItem("fave") || "[]");
    const match = fave.find((item: News) => item.story_id === story_id);

    if (!!match) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  /**
   * With this function we add a news item to the list of favorites.
   * @returns
   */
  const handleFavorite = () => {
    // We check if the news has an id, if not, an alert is returned
    if (story_id === null) {
      return alert("This news does not have a STORY_ID");
    }

    // We use the hook of useLocalStorage the Find function to know if the news is in the list of favorites.
    const status = findValue(story_id);
    // Validate the return of the hook
    if (status) {
      // Remove from the list of favorites.
      // This function is provided by the Hook useLocalStorage.
      removeValue(story_id);
    } else {
      // We add to the current list the new news in the favorites.
      value.push(dataNew);
      // This function is provided by the Hook useLocalStorage.
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
