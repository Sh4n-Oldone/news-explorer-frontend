import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ componentFirst: ComponentFirst, componentSecond: ComponentSecond, ...props }) => {
  return (
    <Route>
      {
        () => props.loggedIn 
          ? <>
              <ComponentFirst {...props} />
              <ComponentSecond {...props} />
            </> 
          : <Redirect to='./' />
      }
    </Route>
  )
};

export default ProtectedRoute;