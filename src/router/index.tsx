import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/dashboard/Dashboard';
import Customers from '@/pages/customers/Customers';
import Reports from '@/pages/reports/Reports';
import Settings from '@/pages/settings/Settings';
import Samples from '@/pages/samples/Samples';
import Login from '@/pages/auth/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/auth/Register';

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.CUSTOMERS,
        element: <Customers />,
      },
      {
        path: ROUTES.REPORTS,
        element: <Reports />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
      {
        path: ROUTES.SAMPLES,
        element: <Samples />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
