const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { markToMarkets } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('markToMarkets');

// This file contains the logic of every route in Forest Admin for the collection markToMarkets:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Mark To Market
router.post('/markToMarkets', permissionMiddlewareCreator.create(), (request, response, next) => {
  next();
});

// Update a Mark To Market
router.put('/markToMarkets/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  next();
});

// Delete a Mark To Market
router.delete('/markToMarkets/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

// Get a list of Mark To Markets
router.get('/markToMarkets', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a number of Mark To Markets
router.get('/markToMarkets/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a Mark To Market
router.get('/markToMarkets/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  next();
});

// Export a list of Mark To Markets
router.get('/markToMarkets.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  next();
});

// Delete a list of Mark To Markets
router.delete('/markToMarkets', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

module.exports = router;
