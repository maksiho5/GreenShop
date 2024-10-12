import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [regist, setRegist] = useState(false);

  return (
    <AppContext.Provider value={{ showOverlay, setShowOverlay, regist, setRegist }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
