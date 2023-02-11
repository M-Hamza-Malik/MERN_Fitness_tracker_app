import { createContext, useReducer } from "react";

export const CardioContext = createContext();

export const cardioReducer = (state, action) => {
  switch (action.type) {
    case "SET_CARDIO":
      return {
        cardio: action.payload,
      };
    case "CREATE_CARDIO":
      return {
        cardio: [action.payload, ...state.cardio],
      };
    case "DELETE_CARDIO":
      return {
        cardio: state.cardio.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const CardioContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardioReducer, {
    cardio: null,
  });

  return (
    <CardioContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CardioContext.Provider>
  );
};
