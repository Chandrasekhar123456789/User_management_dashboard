import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import * as api from '../api/users';
import { UsersContext } from '../context/UsersContext';

export default function EditUser() {
  const { id } = useParams();
  const nav = useNavigate();
  const { updateUserLocal } = useContext(UsersContext);
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    api.getUser(id).then(data => {
      setInitial({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        address: {
          street: data.address?.street || '',
          city: data.address?.city || '',
          zipcode: data.address?.zipcode || '',
          geo: { lat: data.address?.geo?.lat || '', lng: data.address?.geo?.lng || '' }
        }
      });
    }).catch(err => {
      console.error(err);
      alert('Failed to load user');
      nav('/');
    });
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const updated = await api.updateUser(id, values);
      updateUserLocal({ ...updated, _id: updated._id });
      nav(`/users/${id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update user');
    }
  };

  if (!initial) return <p>Loading...</p>;
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <UserForm initialValues={initial} onSubmit={handleSubmit} />
    </div>
  );
}
