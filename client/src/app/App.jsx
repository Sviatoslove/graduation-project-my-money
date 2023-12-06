import React from 'react';

import { Navbar } from './components/ui';
import AppLoader from './components/ui/hoc/AppLoader';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './store/usersSlice';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from './components/routes/routes';
import ContainerApp from './components/common/Containers/ContainerApp';
import { SettingsProvider } from './hooks/useSettings';
import BackBtn from './components/common/buttons/BackBtn';
import { TablesProvider } from './hooks/useTable';
import Toast from './components/common/Toast';
import ModalWindow from './components/common/ModalWindow';
import FormLayout from './layouts/FormLayout';

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const location = useLocation();
  const path = location.pathname === '/';
  const elements = useRoutes(routes(isLoggedIn, location));

  return (
    <AppLoader>
      <ContainerApp>
        {!path && <BackBtn />}
        <SettingsProvider>
          <TablesProvider>
            <Navbar />
            {elements}
            <FormLayout/>
            <Toast />
            <ModalWindow />
          </TablesProvider>
        </SettingsProvider>
      </ContainerApp>
    </AppLoader>
  );
}

export default App;
