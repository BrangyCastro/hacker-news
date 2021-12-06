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

/**
 * Component for rendering the Dropdown
 * @param Props
 * @returns
 */

export const Dropdown = ({ options, onChange, placeholder }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  // We call our hook useLocalStorage
  const [storage, setStorage] = useLocalStorage("lastFilter", "");

  // Function for opening and closing the Dropdown
  const toggling = () => setIsOpen(!isOpen);

  // Function to select an option
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
