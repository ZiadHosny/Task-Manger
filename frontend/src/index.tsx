import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';

import { store } from './store/store';
import './styles/global.css';
import { Router } from './Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <RouterProvider router={Router} />
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
);

