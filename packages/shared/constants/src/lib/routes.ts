import { HomePage } from '@rfm-2024/home';

export const PATH = {
  ROOT: '/',
  HOME: 'home',
};

const { HOME } = PATH;

export const ROUTES = [
  {
    path: HOME,
    Component: HomePage,
    title: 'Home',
  },
];
