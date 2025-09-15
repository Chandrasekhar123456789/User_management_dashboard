import React, { createContext, useEffect, useState } from 'react';
import * as api from '../api/users';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.fetchUsers();
      setUsers(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addUser = (user) => setUsers(prev => [user, ...prev]);
  const updateUserLocal = (user) => setUsers(prev => prev.map(u => u._id === user._id ? user : u));
  const removeUser = (id) => setUsers(prev => prev.filter(u => u._id !== id));

  return (
    <UsersContext.Provider value={{ users, loading, load, addUser, updateUserLocal, removeUser }}>
      {children}
    </UsersContext.Provider>
  );
};
