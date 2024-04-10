import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn ? <Outlet/> : <Navigate to="/bejelentkezes"/>;
};

export default PrivateRoutes;