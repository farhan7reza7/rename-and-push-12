import { lazy } from 'react';
import EmailUs from './email';

const Home = lazy(() => import('./home'));
const Contact = lazy(() => import('./contact'));
const About = lazy(() => import('./about'));
const LogIn = lazy(() => import('./in'));
const LogOut = lazy(() => import('./out'));
const SignUp = lazy(() => import('./up'));
const NotFound = lazy(() => import('./notfound'));
const Bio = lazy(() => import('./bio'));
const Detail = lazy(() => import('./detail'));
const User = lazy(() => import('./user'));
const VerifyEmail = lazy(() => import('./verify-email'));

const routesConfig = [
  {
    path: '',
    element: <Home />,
    children: [{ path: 'detail', element: <Detail /> }],
  },
  { path: 'contact', element: <Contact /> },
  { path: 'user/:id', element: <User /> },
  {
    path: 'about',
    element: <About />,
    children: [
      { path: 'bio', element: <Bio /> },
      { path: 'detail', element: <Detail /> },
    ],
  },
  {
    path: 'in',
    element: <LogIn />,
  },
  { path: 'out', element: <LogOut /> },
  { path: 'up', element: <SignUp /> },
  { path: 'verify-email', element: <VerifyEmail /> },
  { path: 'send-email', element: <EmailUs /> },

  { path: '*', element: <NotFound /> },
];
export default routesConfig;
