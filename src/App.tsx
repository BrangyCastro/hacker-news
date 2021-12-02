import { Header, Tabs, Panel, Card } from "./components";

import "./App.css";

const data = [
  {
    id: 1,
    created_at: "2021-12-01T20:55:29.000Z",
    author: "salsakran",
    story_title: "Ask HN: Who is hiring? (December 2021)",
    favorite: true,
  },
  {
    id: 2,
    created_at: "2021-12-01T20:54:46.000Z",
    author: "nomeq",
    story_title: "Ask HN: Freelancer? Seeking freelancer? (December 2021)",
    favorite: true,
  },
  {
    id: 3,
    created_at: "2021-12-01T20:54:12.000Z",
    author: "mynameisjody",
    story_title: "Ask HN: Who is hiring? (December 2021)",
    favorite: false,
  },
];

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
            <>
              <select name="cars" id="cars">
                <option value="volvo">Angular</option>
                <option value="saab">React</option>
                <option value="mercedes">Vuejs</option>
              </select>
              <div className="container">
                {data.map((item) => (
                  <Card
                    key={item.id}
                    title={item.story_title}
                    time={item.created_at}
                    autor={item.author}
                    favorite={item.favorite}
                  />
                ))}
              </div>
            </>
          </Panel>
          <Panel title="My Faves">
            <h1>Estos son mis favoritos</h1>
          </Panel>
        </Tabs>
      </div>
    </>
  );
}

export default App;
