import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutsContextProvider } from "./context/WorkoutsContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CardioContextProvider } from "./context/CardioContext";
import { SupplementsContextProvider } from "./context/SupplementsContext";
import { ExercisesContextProvider } from "./context/ExercisesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <CardioContextProvider>
          <SupplementsContextProvider>
            <ExercisesContextProvider> 
            <App />
            </ExercisesContextProvider>
          </SupplementsContextProvider>
        </CardioContextProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
