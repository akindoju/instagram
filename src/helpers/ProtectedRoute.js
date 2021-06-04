import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import * as ROUTES from '../constants/routes';

const ProtectedRoutes = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return React.cloneElement(children, { user });
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
};

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
