import { Header, Tabs, Card } from "./components";
import { Alls, Favorite } from "./sections";
import "./App.css";
import { TabsOptions } from "./interfaces/interfaces";

function App() {
  const tabsOptions: TabsOptions[] = [
    {
      title: "Alls",
      component: <Alls />,
    },
    {
      title: "My Faves",
      component: <Favorite />,
    },
  ];

  return (
    <>
      <Header />
      <div className="wrapper">
        <Tabs tabs={tabsOptions} />
      </div>
    </>
  );
}

export default App;
