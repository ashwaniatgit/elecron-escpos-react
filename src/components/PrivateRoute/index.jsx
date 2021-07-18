import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthContext} from '../Auth/AuthProvider.jsx';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser, userProfile } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser && userProfile ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default PrivateRoute;
