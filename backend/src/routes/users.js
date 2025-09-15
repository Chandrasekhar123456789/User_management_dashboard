const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const ctrl = require('../controllers/usersController');

// get all users
router.get('/', ctrl.getAll);

// get single
router.get('/:id', ctrl.getById);

// create
router.post('/',
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  ctrl.createUser
);

// update
router.put('/:id',
  body('email').optional().isEmail().withMessage('Valid email required'),
  ctrl.updateUser
);

// delete
router.delete('/:id', ctrl.deleteUser);

module.exports = router;
