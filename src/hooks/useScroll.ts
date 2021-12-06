import { useEffect, useState } from "react";

/**
 * The custom hook useScroll
 * Returns a status value, and a function to update it.
 * @param callback
 * @returns
 */
export const useScroll = (callback: () => {}) => {
  const [isFetching, setIsFetching] = useState(false);

  // We add an on scroll event listener to the Window object to call a function called handleScroll every time the window scrolls.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  /**
   * Function to detect the bottom of the page.
   */
  const handleScroll = () => {
    // Check if the inner height of the Window object, plus the offsettop of the Document object, is different from the scroll height of the document.
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    // If equal Is Fetching takes the value of true
    setIsFetching(true);
  };

  return [isFetching, setIsFetching] as const;
};
