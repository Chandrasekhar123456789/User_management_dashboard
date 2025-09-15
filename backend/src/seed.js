/*
  Seed script for the SQLite/Postgres backend.
  Run with: npm run seed
  This will create sample users if none exist.
*/
require('dotenv').config();
const { sequelize, User } = require('./models');

const sample = [
  {
    name: 'Alice Example',
    email: 'alice@example.com',
    phone: '111-222-3333',
    company: 'Example Co',
    address_street: '1 Main St',
    address_city: 'Udaipur',
    address_zipcode: '313001',
    geo_lat: '24.5854',
    geo_lng: '73.7125'
  },
  {
    name: 'Bob Sample',
    email: 'bob@example.com',
    phone: '999-888-7777',
    company: 'Sample Ltd',
    address_street: '12 Lake View',
    address_city: 'Udaipur',
    address_zipcode: '313001',
    geo_lat: '24.5854',
    geo_lng: '73.7125'
  },
  {
    name: 'Carol Demo',
    email: 'carol@example.com',
    phone: '555-123-4567',
    company: 'Demo Inc',
    address_street: '45 Old City',
    address_city: 'Udaipur',
    address_zipcode: '313002',
    geo_lat: '24.5794',
    geo_lng: '73.7055'
  }
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const count = await User.count();
    if (count > 0) {
      console.log('Users already exist, skipping seed.');
      process.exit(0);
    }
    await User.bulkCreate(sample);
    console.log('Seeded users.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
