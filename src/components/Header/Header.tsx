import Logo from "../../assets/img/hacker-news-logo.png";

import "./Header.css";

export const Header = () => {
  return (
    <header>
      <img src={Logo} alt="" className="logo" />
    </header>
  );
};
