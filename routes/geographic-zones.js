const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { geographicZones } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('geographicZones');

// This file contains the logic of every route in Forest Admin for the collection geographicZones:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Geographic Zone
router.post('/geographicZones', permissionMiddlewareCreator.create(), (request, response, next) => {
  next();
});

// Update a Geographic Zone
router.put('/geographicZones/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  next();
});

// Delete a Geographic Zone
router.delete('/geographicZones/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

// Get a list of Geographic Zones
router.get('/geographicZones', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a number of Geographic Zones
router.get('/geographicZones/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a Geographic Zone
router.get('/geographicZones/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  next();
});

// Export a list of Geographic Zones
router.get('/geographicZones.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  next();
});

// Delete a list of Geographic Zones
router.delete('/geographicZones', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

module.exports = router;
