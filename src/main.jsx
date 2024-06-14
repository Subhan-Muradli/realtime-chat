import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ChatRoom from './ChatRoom';

const routes = [
  {
    path: '/',
    element: <Navigate to="/signup" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/chat',
    element: <ChatRoom />
  }
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);