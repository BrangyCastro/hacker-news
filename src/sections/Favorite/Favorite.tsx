import { Card } from "../../components";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { News } from "../../interfaces/interfaces";

export const Favorite = () => {
  const [storage, , , removeValue] = useLocalStorage("fave", []);

  const deleteFavorite = (story_id: number) => {
    removeValue(story_id);
  };

  return (
    <div className="container">
      {storage.length <= 0 ? (
        <h1 className="loading">You don't have any favorite news</h1>
      ) : (
        <>
          {storage.map((item: News, index: number) => (
            <Card
              key={index}
              news={item}
              value={storage}
              deleteFavorite={deleteFavorite}
            />
          ))}
        </>
      )}
    </div>
  );
};
