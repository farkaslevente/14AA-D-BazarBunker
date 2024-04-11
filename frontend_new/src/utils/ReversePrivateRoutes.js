import { Outlet, Navigate } from 'react-router-dom';

const ReversePrivateRoutes = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'false';
    return isLoggedIn ? <Outlet/> : <Navigate to="/"/>;
};

export default ReversePrivateRoutes;