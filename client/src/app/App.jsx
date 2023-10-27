import React from 'react';

import { Navbar } from './components/ui';
import AppLoader from './components/ui/hoc/AppLoader';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './store/usersSlice';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from './components/routes/routes';
import ContainerApp from './components/common/Containers/ContainerApp';

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const location = useLocation();
  const elements = useRoutes(routes(isLoggedIn, location));

  return (
    <AppLoader>
      <ContainerApp>
        <Navbar />
        {elements}
      </ContainerApp>
    </AppLoader>
  );
}

export default App;
