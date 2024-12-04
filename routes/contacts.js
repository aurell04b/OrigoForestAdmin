const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { contacts } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('contacts');

// Create a Contact
router.post('/contacts', permissionMiddlewareCreator.create(), (request, response, next) => {
  next();
});

// Update a Contact
router.put('/contacts/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  next();
});

// Delete a Contact
router.delete('/contacts/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

// Get a list of Contacts
router.get('/contacts', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a number of Contacts
router.get('/contacts/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a Contact
router.get('/contacts/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  next();
});

// Export a list of Contacts
router.get('/contacts.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  next();
});

// Delete a list of Contacts
router.delete('/contacts', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

module.exports = router;
