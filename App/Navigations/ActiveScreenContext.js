// ActiveScreenContext.js
import React, { createContext, useContext, useState } from 'react';

const ActiveScreenContext = createContext();

export const useActiveScreen = () => {
  return useContext(ActiveScreenContext);
};

export const ActiveScreenProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState('Home'); 
  return (
    <ActiveScreenContext.Provider value={{ activeScreen, setActiveScreen }}>
      {children}
    </ActiveScreenContext.Provider>
  );
};
