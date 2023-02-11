import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Cardio from "./pages/Cardio";
import Supplements from "./pages/Supplements";
import Exercises from "./pages/Exercises"

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/AboutUs"
              element={user ? <AboutUs /> : <Navigate to="/" />}
            />
            <Route
              path="/cardio"
              element={user ? <Cardio /> : <Navigate to="/" />}
            />
            <Route
              path="/exercises"
              element={user ? <Exercises /> : <Navigate to="/" />}
            />
            <Route
              path="/supplements"
              element={user ? <Supplements /> : <Navigate to="/" />}
            />
            <Route
              path="/weight-lifting"
              element={user ? <Home /> : <Navigate to="/" />}
            />            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
