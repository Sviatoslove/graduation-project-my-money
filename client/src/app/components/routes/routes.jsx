import { Navigate, useParams } from 'react-router-dom';
import {
  CategoriesPage,
  ChartsPage,
  CountsPage,
  CurrencyPage,
  LoginPage,
  LogoutPage,
  MainPage,
  OperationsHistoryPage,
  RegularPaymentsPage,
  UserPage,
} from '../../pages';
import { AuthLayout, CountsLayout, UserLayout } from '../../layouts';
import localStorageService from '../../services/localStorage.service';
import CountsLikes from '../../pages/countsPage/CountsLikes';
import CountsTranslations from '../../pages/countsPage/HistoryTranslations';

const routes = (isLoggedIn, location) => {
  const currentUserId = localStorageService.getUserId();
  const userId = location.pathname.split('/')[2];
  return [
    {
      name: 'Главная страница',
      icon: 'bi bi-coin',
      path: '',
      pathname: '/',

      display: true,
      element: <MainPage />,
    },
    {
      name: 'Авторизация',
      icon: 'bi bi-door-open',
      path: 'auth',
      display: isLoggedIn ? false : true,
      element: <AuthLayout />,
      children: [
        {
          path: '*',
          element: <Navigate to="/auth" />,
        },
        {
          path: '',
          element: <LoginPage />,
        },
      ],
    },
    {
      name: 'Счета',
      icon: 'bi bi-piggy-bank-fill',
      path: `counts`,
      display: isLoggedIn,
      element: isLoggedIn ? (
        <CountsLayout />
      ) : (
        <Navigate to="/auth/login" state={{ referrer: location }} />
      ),
      children: [
        {
          name: 'Счета',
          path: '',
          pathname: `/counts`,
          element: <CountsPage />,
        },
        {
          name: 'Избранные счета',
          path: ':likesPage',
          pathname: `/counts/likesPage`,
          element: <CountsLikes />,
        },
        {
          name: 'История переводов',
          path: 'translations',
          pathname: `/counts/translations`,
          element: <CountsTranslations />,
        },
      ],
    },
    {
      name: 'Графики',
      icon: 'bi-graph-up',
      path: 'charts',
      pathname: location.pathname,
      display: isLoggedIn,
      element: <ChartsPage />,
    },
    {
      name: 'Категории',
      icon: 'bi bi-stack',
      path: 'categories',
      pathname: location.pathname,
      display: isLoggedIn,
      element: <CategoriesPage />,
    },
    {
      name: 'Регулярные платежи',
      icon: 'bi bi-currency-exchange',
      path: 'regularPayments',
      pathname: location.pathname,
      display: isLoggedIn,
      element: <RegularPaymentsPage />,
    },
    {
      name: 'Валюта',
      icon: 'bi bi-currency-euro',
      path: 'currency',
      pathname: location.pathname,
      display: isLoggedIn,
      element: <CurrencyPage />,
    },
    {
      name: 'История операций',
      icon: 'bi bi-clock-history',
      path: 'operationsHistory',
      pathname: location.pathname,
      display: isLoggedIn,
      element: <OperationsHistoryPage />,
    },
    {
      path: 'user',
      element: isLoggedIn ? (
        <UserLayout />
      ) : (
        <Navigate to="/auth" state={{ referrer: location }} />
      ),
      children: [
        {
          name: 'Мой профиль',
          path: ':userId',
          pathname: `/user/${currentUserId}`,
          element:
            userId !== currentUserId ? <Navigate to="/" /> : <UserPage />,
        },
      ],
    },
    {
      path: 'logout',
      element: <LogoutPage />,
    },
    {
      path: '*',
      element: <Navigate to={isLoggedIn ? '/' : '/auth'} />,
    },
  ];
};

export default routes;
