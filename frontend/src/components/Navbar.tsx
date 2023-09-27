import { useState, useEffect } from 'react'
import { Avatar, Menu, MenuItem } from '@mui/material'
import '../styles/Navbar.css'
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../store/usersApiSlice';
import { logout } from '../store/authSlice';
import { setLoading } from '../store/loadingSlice';
import { toast } from 'react-toastify';
import logo from '../images/task.png'
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const Navbar = () => {
    const { userInfo } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();
    const [logoutApiCall, { isLoading }] = useLogoutMutation();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(setLoading(isLoading))
    }, [dispatch, setLoading, isLoading])

    const onClickLogout = async () => {
        try {
            await logoutApiCall({}).unwrap();
            dispatch(logout())
            navigate('/login');
        } catch (err: any) {
            toast.error(err?.data?.error || err?.error);
        }
    }

    return (
        <header>
            <img
                className="website-logo"
                src={logo}
                alt="task Logo"
            />
            <div>Task Manger App</div>
            <div style={{ width: 100 }}>
                {userInfo ?
                    <>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>{`${userInfo.firstName[0]?.toUpperCase()}`}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                {userInfo.firstName}
                            </MenuItem>
                            <MenuItem onClick={onClickLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                    :
                    <></>
                }
            </div>
        </header >
    )
}
