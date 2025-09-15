import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UsersProvider } from './context/UsersContext';
import Dashboard from './pages/Dashboard';
import UserDetails from './pages/UserDetails';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';

export default function App() {
  return (
    <UsersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/users/new" element={<CreateUser/>} />
          <Route path="/users/:id" element={<UserDetails/>} />
          <Route path="/users/:id/edit" element={<EditUser/>} />
        </Routes>
      </BrowserRouter>
    </UsersProvider>
  );
}
