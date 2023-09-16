import { createContext, useContext } from "react";

const PageContext = createContext();

export const PageContextWrapper = ({ value, children }) => {
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = () => {
  return useContext(PageContext);
};
