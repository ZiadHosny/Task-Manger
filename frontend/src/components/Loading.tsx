import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../store';
import { loading } from '../slices/loadingSlice';

export const Loading = () => {
    const { isLoading } = useSelector((state: StoreState) => state.loading);
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(loading(false))
    };

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
