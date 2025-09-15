import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as api from '../api/users';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    api.getUser(id).then(setUser).catch(err => {
      console.error(err);
      alert('Failed to load user');
      nav('/');
    });
  }, [id]);

  if (!user) return <p>Loading...</p>;

  const lat = user.address?.geo?.lat;
  const lng = user.address?.geo?.lng;
  const mapsLink = (lat && lng) ? `https://www.google.com/maps?q=${encodeURIComponent(lat)},${encodeURIComponent(lng)}` : null;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-sm text-blue-600">Back</Link>
        <Link to={`/users/${id}/edit`} className="text-sm text-yellow-700">Edit</Link>
      </div>
      <h1 className="text-2xl font-bold mt-2">{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company}</p>

      <h2 className="mt-4 font-semibold">Address</h2>
      <p>{user.address?.street || '—'}</p>
      <p>{user.address?.city || '—'} {user.address?.zipcode ? `, ${user.address.zipcode}` : ''}</p>

      <h3 className="mt-2 font-semibold">Geo</h3>
      <p>Lat: {lat || '—'} | Lng: {lng || '—'}</p>

      {mapsLink && (
        <p className="mt-2">
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-blue-600">Open in Google Maps</a>
        </p>
      )}
    </div>
  );
}
