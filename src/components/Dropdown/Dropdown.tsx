import { useState } from "react";
import Arrow from "../../assets/img/arrow.png";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Options } from "../../interfaces/interfaces";

interface Props {
  options: Options[];
  onChange?: (filter: string) => void;
}

export const Dropdown = ({ options, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [storage, setStorage] = useLocalStorage("lastFilter", "");

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    localStorage.setItem("lastFilter", JSON.stringify(value));
    setIsOpen(false);
    onChange && onChange(value);
    setStorage(value);
  };

  return (
    <div className="selector">
      <div id="selectField" onClick={toggling}>
        <p>{storage || "Select your news"}</p>
        <img src={Arrow} alt="" />
      </div>
      {isOpen && (
        <ul id="list">
          {options.map((option, index) => (
            <li
              key={index}
              className="options"
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
