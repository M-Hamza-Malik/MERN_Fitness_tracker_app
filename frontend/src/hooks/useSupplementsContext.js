import { SupplementsContext } from "../context/SupplementsContext";
import { useContext } from "react";

export const useSupplementsContext = () => {
  const context = useContext(SupplementsContext);

  if (!context) {
    throw Error(
      "useSupplementsContext must be used inside an SupplementsContextProvider"
    );
  }

  return context;
};
