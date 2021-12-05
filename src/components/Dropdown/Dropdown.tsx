import { useState } from "react";
import Arrow from "../../assets/img/arrow.png";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Options } from "../../interfaces/interfaces";

import "./Dropdown.css";

interface Props {
  placeholder: string;
  options: Options[];
  onChange?: (filter: string) => void;
}

export const Dropdown = ({ options, onChange, placeholder }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [storage, setStorage] = useLocalStorage("lastFilter", "");

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setIsOpen(false);
    onChange && onChange(value);
    setStorage(value);
  };

  return (
    <div className="selector">
      <div id="selectField" onClick={toggling}>
        <p>{storage || placeholder}</p>
        <img src={Arrow} alt="" className={`${isOpen ? "rotate" : ""}`} />
      </div>
      {isOpen && (
        <ul id="list">
          {options.map((option, index) => (
            <li
              key={index}
              className={`options ${
                storage === option.value ? "is-Selected" : ""
              }`}
              onClick={onOptionClicked(option.value)}
            >
              <img src={option.icon} alt="" />
              <p>{option.label}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
