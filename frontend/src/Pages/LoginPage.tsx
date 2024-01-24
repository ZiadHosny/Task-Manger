import { useEffect } from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useLoginMutation } from "../store/usersApiSlice";
import { setCredentials } from "../store/authSlice";
import { setLoading } from "../store/loadingSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const LoginPage = () => {
    const { userInfo } = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    useEffect(() => {
        dispatch(setLoading(isLoading))
    }, [dispatch, isLoading])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            const email = data.get('email') as string
            const password = data.get('password') as string

            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));

            navigate(redirect);

            toast.success('Login Successfully!');

        } catch (err: any) {
            toast.error(err?.data?.error || err?.error);
        }
    };

    const onClickSignUpPage = () => {
        navigate('/signup')
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="one-time-code"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={onClickSignUpPage} variant="body2">
                                I don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}