const express = require('express'); 
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { entities } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('entities');

// This file contains the logic of every route in Forest Admin for the collection entities:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Entity
router.post('/entities', permissionMiddlewareCreator.create(), (request, response, next) => {
  next();
});

// Update a Entity
router.put('/entities/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  next();
});

// Delete a Entity
router.delete('/entities/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

// Get a list of Entities
router.get('/entities', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a number of Entities
router.get('/entities/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a Entity
router.get('/entities/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  next();
});

// Export a list of Entities
router.get('/entities.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  next();
});

// Delete a list of Entities
router.delete('/entities', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

module.exports = router;
