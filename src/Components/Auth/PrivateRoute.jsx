import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';



// Private Route for authenticated users
export const PrivateRoute = ({ children }) => {
    const { token } = useSelector((state) => state.user);

    return token !== null ? children : <Navigate to="/signUp" />;
};



// Private Route for updating property card
export const PrivateUpdateCardRoute = ({ children }) => {
    const propCardData = useSelector((state) => state.propUpdate.propCardData);

    return propCardData !== null ? children : <Navigate to="/dashboard/my-Properties" />;
};
