import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import * as api from '../api/users';
import { UsersContext } from '../context/UsersContext';

export default function CreateUser() {
  const nav = useNavigate();
  const { addUser } = useContext(UsersContext);

  const handleSubmit = async (values) => {
    try {
      const created = await api.createUser(values);
      addUser(created);
      nav('/');
    } catch (err) {
      console.error(err);
      alert('Failed to create user');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
