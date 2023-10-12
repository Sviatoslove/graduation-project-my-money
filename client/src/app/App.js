import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Main from './layouts/Main';
import Login from './layouts/Login';
import Navbar from './components/ui/Navbar';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route index element={<Main />} />
      <Route path="login" element={<Login />}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </>
  );
}

export default App;
