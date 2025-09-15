import React, { useContext, useMemo, useState } from 'react';
import { UsersContext } from '../context/UsersContext';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { users, loading } = useContext(UsersContext);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return users;
    return users.filter(u => u.name.toLowerCase().includes(s));
  }, [users, q]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link to="/users/new" className="bg-blue-600 text-white px-3 py-1 rounded">Create New</Link>
      </div>

      <SearchBar value={q} onChange={setQ} placeholder="Search by name..." />

      {loading ? <p>Loading...</p> : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {filtered.map(u => <UserCard key={u._id} user={u} />)}
        </div>
      )}
    </div>
  );
}
