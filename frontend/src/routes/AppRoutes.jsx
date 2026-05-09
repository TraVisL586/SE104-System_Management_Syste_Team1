import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import StudentDetail from '../pages/StudentDetail';
import CourseSections from '../pages/CourseSections';
import Registrations from '../pages/Registrations';
import Tuition from '../pages/Tuition';
import NotFound from '../pages/NotFound';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/students',
        element: <Students />,
      },
      {
        path: '/students/:studentId',
        element: <StudentDetail />,
      },
      {
        path: '/course-sections',
        element: <CourseSections />,
      },
      {
        path: '/registrations',
        element: <Registrations />,
      },
      {
        path: '/tuition',
        element: <Tuition />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default appRouter;