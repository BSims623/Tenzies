import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout, Landing, Register, Login, Dashboard, Game, Profile, CurrentUserProfile, EditProfile, LookupUserProfile, FullLeaderBoard, Error } from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as editProfileAction } from './pages/EditProfile';
import { loader as dashboardLoader } from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Game />,
          },
          {
            path: 'profile',
            element: <Profile />,
            children: [
              {
                index: true,
                element: <CurrentUserProfile />,
              },
              {
                path: 'edit-profile',
                element: <EditProfile />,
                action: editProfileAction,
              },
              {
                path: 'lookup-user',
                element: < LookupUserProfile />,
              }
            ]
          },
          {
            path: 'leaderboard',
            element: <FullLeaderBoard />,
          }
        ]
      }
    ]
  }
]);




const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App