import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../store';

export const PrivateRoutes = () => {
    const { userInfo } = useSelector((state: StoreState) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
