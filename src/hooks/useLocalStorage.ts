import { useState, useEffect } from "react";

/**
 * The hook of useLocalStorage serves to store and query LocalStorage data.
 * It receives as parameters the key and a default value that can be optional.
 * @param key
 * @param defaultValue
 */

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  /**
   * this function gets the value of the localstorage with the key provided by
   * the parameters and returns the value found and in case it is null returns
   * the default value
   */
  const getStorageValue = () => {
    //Get from local storage by key
    const item = localStorage.getItem(key);
    //Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : defaultValue;
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(getStorageValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  /**
   * Return a wrapped version of useState's setter function that
   * persists the new value to localStorage.
   * @param value
   */
  const setValue = (value: T) => {
    // Allow value to be a function so we have same API as useState
    const newValue = value instanceof Function ? value(storedValue) : value;
    // Save to local storage
    localStorage.setItem(key, JSON.stringify(newValue));
    // Save state
    setStoredValue(newValue);
  };

  /**
   * This function is only to search for the favorites, it returns a boolean
   * @param id
   * @returns
   */
  const findValue = (id: number) => {
    // Search by id
    const removeFave = storedValue.find((fave: any) => fave.story_id === id);
    // And returns true if found.
    if (!!removeFave) {
      return true;
    }
    return false;
  };

  /**
   * This function is only to search for the favorites
   * @param id
   */
  const removeValue = (id: number) => {
    const oldData = getStorageValue();
    const removeFave = oldData.find((fave: any) => fave.story_id === id);
    let index = oldData.indexOf(removeFave);
    oldData.splice(index, 1);
    setValue(oldData);
  };

  return [storedValue, setValue, findValue, removeValue];
}
