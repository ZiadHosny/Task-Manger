import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { setLoading } from '../store/loadingSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const Loading = () => {
    const { isLoading } = useAppSelector((state) => state.loading);
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(setLoading(false))
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
