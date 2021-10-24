import React, { createContext } from "react";
import { getPathLanguage } from '../@utils/languageHelper';

export const AppContext = createContext();

const AppProvider = (props) => {
  return (
    <AppContext.Provider value={{ language: getPathLanguage() }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
