import { Card } from "../../components";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { News } from "../../interfaces/interfaces";

export const Favorite = () => {
  // We call our hook useLocalStorage
  const [storage, , , removeValue] = useLocalStorage("fave", []);

  /**
   * Function to remove the news from the favorites.
   * @param story_id
   */
  const deleteFavorite = (story_id: number) => {
    // Remove from the list of favorites.
    // This function is provided by the Hook useLocalStorage.
    removeValue(story_id);
  };

  return (
    <>
      {storage.length <= 0 ? (
        <h1 className="loading">You don't have any favorite news</h1>
      ) : (
        <div className="container">
          {storage.map((item: News, index: number) => (
            <Card
              key={index}
              news={item}
              value={storage}
              deleteFavorite={deleteFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
};
