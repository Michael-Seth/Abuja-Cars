import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  //Destructure the status and loggedIn state from useAuthStatus
  const { loggedIn, checkStatus } = useAuthStatus();

  //If checkStatus is true, Show Loading
  if (checkStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;

// This section of the code helps to protect private routes in your system. The useAuthStatus checks if the user is logged in or not.

// If the user's status is loggedin, then the Outlet function navigates the user to the home page, if the user is not logged it will redirect him/her to the sign-in page
