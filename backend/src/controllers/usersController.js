const { User } = require('../models');
const { validationResult } = require('express-validator');

/*
 Controller uses Sequelize model.
 Address and geo are stored as separate columns for simplicity.
*/

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [['createdAt', 'DESC']] });
    // map to shape used by frontend
    const mapped = users.map(u => ({
      _id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      company: u.company,
      address: {
        street: u.address_street,
        city: u.address_city,
        zipcode: u.address_zipcode,
        geo: { lat: u.geo_lat, lng: u.geo_lng }
      },
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
    }));
    res.json(mapped);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const u = await User.findByPk(req.params.id);
    if (!u) return res.status(404).json({ error: 'User not found' });
    res.json({
      _id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      company: u.company,
      address: {
        street: u.address_street,
        city: u.address_city,
        zipcode: u.address_zipcode,
        geo: { lat: u.geo_lat, lng: u.geo_lng }
      },
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
    });
  } catch (err) { next(err); }
};

exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const payload = req.body;
    const created = await User.create({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      address_street: payload.address?.street || '',
      address_city: payload.address?.city || '',
      address_zipcode: payload.address?.zipcode || '',
      geo_lat: payload.address?.geo?.lat || '',
      geo_lng: payload.address?.geo?.lng || ''
    });

    res.status(201).json({
      _id: created.id,
      name: created.name,
      email: created.email,
      phone: created.phone,
      company: created.company,
      address: {
        street: created.address_street,
        city: created.address_city,
        zipcode: created.address_zipcode,
        geo: { lat: created.geo_lat, lng: created.geo_lng }
      },
      createdAt: created.createdAt,
      updatedAt: created.updatedAt
    });
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const u = await User.findByPk(req.params.id);
    if (!u) return res.status(404).json({ error: 'User not found' });

    const payload = req.body;
    await u.update({
      name: payload.name ?? u.name,
      email: payload.email ?? u.email,
      phone: payload.phone ?? u.phone,
      company: payload.company ?? u.company,
      address_street: payload.address?.street ?? u.address_street,
      address_city: payload.address?.city ?? u.address_city,
      address_zipcode: payload.address?.zipcode ?? u.address_zipcode,
      geo_lat: payload.address?.geo?.lat ?? u.geo_lat,
      geo_lng: payload.address?.geo?.lng ?? u.geo_lng
    });

    res.json({
      _id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      company: u.company,
      address: {
        street: u.address_street,
        city: u.address_city,
        zipcode: u.address_zipcode,
        geo: { lat: u.geo_lat, lng: u.geo_lng }
      },
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
    });
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const u = await User.findByPk(req.params.id);
    if (!u) return res.status(404).json({ error: 'User not found' });
    await u.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
};
