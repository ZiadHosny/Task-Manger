import { useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useAppSelector } from "../store/hooks";

export const HomePage = () => {
    const navigate = useNavigate()
    const { userInfo } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/tasks');
        }
    }, [navigate, userInfo]);


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
                <Button
                    onClick={() => {
                        navigate('/login')
                    }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                <Button
                    onClick={() => {
                        navigate('/signup')
                    }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
            </Box>
        </Container>
    )
}
