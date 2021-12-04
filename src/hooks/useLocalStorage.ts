import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: [] | string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: [] | string) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const findValue = (id: number) => {
    const removeFave = storedValue.find((fave: any) => fave.story_id === id);
    if (!!removeFave) {
      return {
        status: true,
        value: removeFave,
      };
    }
    return { status: false };
  };

  return [storedValue, setValue, findValue] as const;
};
