import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { Loading } from './components/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {

  return (
    <Box className='app'>
      <ThemeProvider theme={darkTheme}>
        <Navbar />
        <ToastContainer />
        <Outlet />
        <Loading />
      </ThemeProvider >
    </Box>
  )
}

export default App;
