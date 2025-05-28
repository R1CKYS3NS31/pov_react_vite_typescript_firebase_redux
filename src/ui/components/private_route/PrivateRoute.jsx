import { Navigate } from "react-router-dom";
import { isUserSignedIn } from "../../../services/firebase/config/firebase-auth";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  
  return isUserSignedIn() ? (
    <Component />
  ) : (
    <Navigate
      to={{
        pathname: "/signin",
        state: { from: rest.location },
      }}
      replace
    />
  );
};
