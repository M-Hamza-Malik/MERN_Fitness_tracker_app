import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <div className="title">
          <Link to="/">
            <h1>Fitness Tracker</h1>
          </Link>
        </div>
        {/* <Link to="/aboutus">
          <p>About Us</p>
        </Link> */}
        <Link to="/supplements">
          <p>Supplements</p>
        </Link>
        <Link to="/exercises">
          <p>Exercises</p>
        </Link>
        <Link to="/weight-lifting">
          <p>Weight Lifting</p>
        </Link>
        <Link to="/cardio">
          <p>Cardio</p>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
