import Favorite from "../../assets/img/favorite.png";
import NotFavorite from "../../assets/img/not-favorite.png";
import Time from "../../assets/img/time.png";

import "./Card.css";

interface Props {
  title: string;
  time: string;
  autor: string;
  favorite: boolean;
}

export const Card = ({ title, time, favorite, autor }: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="time">
          <img src={Time} alt="" />
          <span>
            {time} by {autor}
          </span>
        </div>
        <h1>{title}</h1>
      </div>
      <div className="card-button">
        <img src={favorite ? Favorite : NotFavorite} alt="" />
      </div>
    </div>
  );
};
