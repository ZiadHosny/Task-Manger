import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TaskPage } from './Pages/TaskPage';
import { ThemeProvider, createTheme } from '@mui/material';
import { SignUpPage } from './Pages/SignUpPage';
import { LoginPage } from './Pages/LoginPage';
import { HomePage } from './Pages/HomePage';
import { loadingState, loggedInUserState } from './utils/atoms';
import { useRecoilValue } from 'recoil';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const loggedInUser = useRecoilValue(loggedInUserState)
  const loading = useRecoilValue(loadingState)

  const PrivateRoutes = () => {
    return (
      loggedInUser.name ? <TaskPage /> : <Navigate to="/login" />
    )
  }

  return (
    <div className='app'>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path='/tasks' element={<TaskPage />} />
            </Route>
            <Route path='/' element={loggedInUser.name ? <TaskPage /> : <HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div >
  )
}

export default App;
