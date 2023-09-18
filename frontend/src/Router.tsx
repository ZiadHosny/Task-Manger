import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import { SignUpPage } from './Pages/SignUpPage';
import { LoginPage } from './Pages/LoginPage';
import { TaskPage } from './Pages/TaskPage';
import { HomePage } from './Pages/HomePage';
import { PrivateRoutes } from './components/PrivateRoute';
import App from './App';


export const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='' element={<PrivateRoutes />}>
                <Route path='/tasks' element={<TaskPage />} />
            </Route>
        </Route>
    )
)