import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import Dashboard from './pages/home.tsx';
import Login from './pages/auth.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Dashboard />} />
      <Route path='/auth' element={<Login />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
