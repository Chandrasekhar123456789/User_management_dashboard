import React from 'react';
import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  return (
    <div className="border rounded p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm truncate">{user.email}</p>
      <p className="text-sm">{user.phone}</p>
      <p className="text-sm italic">{user.company}</p>
      <Link to={`/users/${user._id}`} className="text-blue-600 mt-2 inline-block">View details</Link>
    </div>
  );
}
