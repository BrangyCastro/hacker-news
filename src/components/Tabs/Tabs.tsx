import { useState } from "react";
import { TabsOptions } from "../../interfaces/interfaces";

import "./Tabs.css";

interface Props {
  selected?: number;
  tabs: TabsOptions[];
}

/**
 * Component for rendering the Tabs
 * @param Props
 * @returns
 */
export const Tabs = ({ selected = 0, tabs }: Props) => {
  const [state, setState] = useState(selected);

  // Function to change tabs
  const selectedHandleChange = (index: number) => {
    setState(index);
  };

  return (
    <div>
      <ul className="inline">
        {tabs?.map((elem: any, index: number) => {
          let style = index === state ? "selected" : "";
          return (
            <li
              className={style}
              key={index}
              onClick={() => selectedHandleChange(index)}
            >
              {elem.title}
            </li>
          );
        })}
      </ul>
      <div className="tab">{tabs[state].component}</div>
    </div>
  );
};
