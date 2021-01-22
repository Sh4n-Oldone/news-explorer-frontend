import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ componentFirst: ComponentFirst, componentSecond: ComponentSecond, ...props }) => {
  
  function redirectWithPopUp() {
    props.handlePopupLogInOpen();
    return <Redirect exact to='/' />
  }

  return (
    <Route>
      {
        () => props.loggedIn 
          ? <>
              <ComponentFirst {...props} />
              <ComponentSecond {...props} />
            </> 
          : redirectWithPopUp()
      }
    </Route>
  )
};

export default ProtectedRoute;