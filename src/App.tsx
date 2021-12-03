import { Header, Tabs, Panel, Card } from "./components";
import { Alls, Favorite } from "./sections";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <div className="wrapper">
        <Tabs>
          <Panel title="Alls">
            <Alls />
          </Panel>
          <Panel title="My Faves">
            <Favorite />
          </Panel>
        </Tabs>
      </div>
    </>
  );
}

export default App;
