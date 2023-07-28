import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { loadingState } from "../utils/atoms";
import { useRecoilState } from "recoil";

export const LoginPage = () => {
    const [_loading, setLoading] = useRecoilState(loadingState)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [{ error, loading }, loginFn] = useLogin()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string
        const password = data.get('password') as string
        if (email && password) {
            loginFn({ email, password })
        }
    };

    React.useEffect(() => {
        if (error) {
            setOpen(true);
        }
        if (loading) {
            setLoading(true);
        }
    }, [error])

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
                                autoComplete="email"
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
                            <Link onClick={() => { navigate('/signup') }} variant="body2">
                                I don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
            >
                <Alert severity="error">{error?.message ?? ''}</Alert>
            </Snackbar>
        </Container>
    );
}