import { useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "../services/utils/functions";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {

      const value = getFromLocalStorage(keyName);
      const currentDate = new Date();

      if (value && new Date(value.exp) > currentDate) {
        return value;
      } else {
        saveToLocalStorage(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
  });

  const setValue = (newValue) => {
    saveToLocalStorage(keyName, newValue);
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
