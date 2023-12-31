import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props  }) => props.loggedIn
  ? <Component {...props} />
  : <Navigate to="/sign-in" replace/>;

export default ProtectedRoute;