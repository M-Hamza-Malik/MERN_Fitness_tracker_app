import { createContext, useReducer } from "react";

export const SupplementsContext = createContext();

export const supplementsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SUPPLEMENTS":
      return {
        supplements: action.payload,
      };
    case "CREATE_SUPPLEMENT":
      return {
        supplements: [action.payload, ...state.supplements],
      };
    case "DELETE_SUPPLEMENT":
      return {
        supplements: state.supplements.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const SupplementsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(supplementsReducer, {
    supplements: null,
  });

  return (
    <SupplementsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SupplementsContext.Provider>
  );
};
