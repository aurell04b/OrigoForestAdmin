const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { geographicZoneGroups } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('geographicZoneGroups');

// This file contains the logic of every route in Forest Admin for the collection geographicZoneGroups:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Geographic Zone Group
router.post('/geographicZoneGroups', permissionMiddlewareCreator.create(), (request, response, next) => {
  next();
});

// Update a Geographic Zone Group
router.put('/geographicZoneGroups/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  next();
});

// Delete a Geographic Zone Group
router.delete('/geographicZoneGroups/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

// Get a list of Geographic Zone Groups
router.get('/geographicZoneGroups', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a number of Geographic Zone Groups
router.get('/geographicZoneGroups/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a Geographic Zone Group
router.get('/geographicZoneGroups/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  next();
});

// Export a list of Geographic Zone Groups
router.get('/geographicZoneGroups.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  next();
});

// Delete a list of Geographic Zone Groups
router.delete('/geographicZoneGroups', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

module.exports = router;
