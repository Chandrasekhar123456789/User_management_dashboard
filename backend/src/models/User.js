const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
  lat: { type: String, default: '' },
  lng: { type: String, default: '' }
}, { _id: false });

const AddressSchema = new mongoose.Schema({
  street: { type: String, default: '' },
  city: { type: String, default: '' },
  zipcode: { type: String, default: '' },
  geo: { type: GeoSchema, default: () => ({}) }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true, default: '' },
  address: { type: AddressSchema, default: () => ({}) }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
