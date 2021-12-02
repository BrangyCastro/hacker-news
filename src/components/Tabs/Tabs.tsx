import { useState } from "react";

import "./Tabs.css";

interface Props {
  selected?: number;
  children: React.ReactElement[];
}

export const Tabs = ({ selected = 0, children }: Props) => {
  const [state, setState] = useState(selected);

  const selectedHandleChange = (index: number) => {
    setState(index);
  };

  return (
    <div>
      <ul className="inline">
        {children?.map((elem: any, index: number) => {
          let style = index === state ? "selected" : "";
          return (
            <li
              className={style}
              key={index}
              onClick={() => selectedHandleChange(index)}
            >
              {elem.props.title}
            </li>
          );
        })}
      </ul>
      <div className="tab">{children[state]}</div>
    </div>
  );
};
