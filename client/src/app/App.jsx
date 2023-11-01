import React from 'react';

import { Navbar } from './components/ui';
import AppLoader from './components/ui/hoc/AppLoader';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './store/usersSlice';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from './components/routes/routes';
import ContainerApp from './components/common/Containers/ContainerApp';
import BackBtn from './components/common/BackBtn';
import { FormsProvider } from './hooks/useForm';

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const location = useLocation();
  const path = location.pathname === '/';
  const elements = useRoutes(routes(isLoggedIn, location));

  return (
    <AppLoader>
      <ContainerApp>
        {!path && (
          <BackBtn
            classes={
              'w-content shadow-custom position-absolute top-94px start-30px'
            }
          />
        )}
        <FormsProvider>
            <Navbar />
            {elements}
        </FormsProvider>
      </ContainerApp>
    </AppLoader>
  );
}

export default App;
