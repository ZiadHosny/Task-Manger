import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../store/hooks';

export const PrivateRoutes = () => {
    const { userInfo } = useAppSelector((state) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
