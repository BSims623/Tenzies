import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HomeLayout, Landing, Register, Login, Dashboard, Game, Profile, CurrentUserProfile, EditProfile, LookupUserProfile, FullLeaderBoard, Error } from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as editProfileAction } from './pages/EditProfile';
import { loader as dashboardLoader } from './pages/Dashboard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        action: loginAction(queryClient),
      },
      {
        path: 'dashboard',
        element: <Dashboard queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
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
                action: editProfileAction(queryClient),
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App