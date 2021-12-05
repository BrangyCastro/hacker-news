import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const getStorageValue = () => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  };

  const [storedValue, setStoredValue] = useState(getStorageValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  const setValue = (value: T) => {
    const newValue = value instanceof Function ? value(storedValue) : value;
    localStorage.setItem(key, JSON.stringify(newValue));
    setStoredValue(newValue);
  };

  const findValue = (id: number) => {
    const removeFave = storedValue.find((fave: any) => fave.story_id === id);
    if (!!removeFave) {
      return true;
    }
    return false;
  };

  const removeValue = (id: number) => {
    const oldData = getStorageValue();
    const removeFave = oldData.find((fave: any) => fave.story_id === id);

    let index = oldData.indexOf(removeFave);
    oldData.splice(index, 1);
    setValue(oldData);
  };

  return [storedValue, setValue, findValue, removeValue];
}
