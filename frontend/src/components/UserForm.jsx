import React, { useState } from 'react';

const defaultInitial = {
  name: '',
  email: '',
  phone: '',
  company: '',
  address: { street: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }
};

export default function UserForm({ onSubmit, initialValues }) {
  const initial = initialValues || defaultInitial;
  const [values, setValues] = useState(initialValues || initial);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = 'Name is required';
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Valid email required';
    return e;
  };

  const handle = (path, v) => {
    // path like "address.city" or "name"
    if (!path.includes('.')) {
      setValues(prev => ({ ...prev, [path]: v }));
      return;
    }
    const parts = path.split('.');
    setValues(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      let cur = copy;
      for (let i=0;i<parts.length-1;i++) cur = cur[parts[i]];
      cur[parts[parts.length-1]] = v;
      return copy;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const ev = validate();
    setErrors(ev);
    if (Object.keys(ev).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm">Name</label>
        <input value={values.name} onChange={e => handle('name', e.target.value)} className="w-full border rounded px-2 py-1" />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input value={values.email} onChange={e => handle('email', e.target.value)} className="w-full border rounded px-2 py-1" />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm">Phone</label>
        <input value={values.phone} onChange={e => handle('phone', e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>

      <div>
        <label className="block text-sm">Company</label>
        <input value={values.company} onChange={e => handle('company', e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>

      <div>
        <label className="block text-sm">Street</label>
        <input value={values.address.street} onChange={e => handle('address.street', e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">City</label>
          <input value={values.address.city} onChange={e => handle('address.city', e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm">Zipcode</label>
          <input value={values.address.zipcode} onChange={e => handle('address.zipcode', e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Lat</label>
          <input value={values.address.geo.lat} onChange={e => handle('address.geo.lat', e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm">Lng</label>
          <input value={values.address.geo.lng} onChange={e => handle('address.geo.lng', e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
      </div>

      <div>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
      </div>
    </form>
  );
}
