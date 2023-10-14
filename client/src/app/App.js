import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {Login, Logout, Main} from './layouts';
import { Navbar } from './components/ui';
import AppLoader from './components/ui/hoc/AppLoader';
import Counts from './layouts/Counts';

function App() {
  return (
    <AppLoader>
    <Navbar />
    <Routes>
      <Route index element={<Main />} />
      <Route path="login" element={<Login />}/>
      <Route path="logout" element={<Logout />}/>
      <Route path="counts" element={<Counts />}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </AppLoader>
  );
}

export default App;
