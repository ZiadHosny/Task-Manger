import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import { store } from './store';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { SignUpPage } from './Pages/SignUpPage';
import { LoginPage } from './Pages/LoginPage';
import { TaskPage } from './Pages/TaskPage';
import { HomePage } from './Pages/HomePage';
import { PrivateRoutes } from './components/PrivateRoute';

const router = createBrowserRouter(
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
);

