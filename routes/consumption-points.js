const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { consumptionPoints } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('consumptionPoints');

// This file contains the logic of every route in Forest Admin for the collection consumptionPoints:
// - Native routes are already generated but can be extended/overridden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Consumption Point
router.post('/consumptionPoints', permissionMiddlewareCreator.create(), (request, response, next) => {
  try {
    next();
  } catch (error) {
    console.error('Error during create operation:', error);
    response.status(500).send('Error during create operation');
  }
});

// Update a Consumption Point
router.put('/consumptionPoints/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  try {
    next();
  } catch (error) {
    console.error('Error during update operation:', error);
    response.status(500).send('Error during update operation');
  }
});

// Delete a Consumption Point
router.delete('/consumptionPoints/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  try {
    next();
  } catch (error) {
    console.error('Error during delete operation:', error);
    response.status(500).send('Error during delete operation');
  }
});

// Get a list of Consumption Points
router.get('/consumptionPoints', permissionMiddlewareCreator.list(), (request, response, next) => {
  try {
    next();
  } catch (error) {
    console.error('Error during fetch list operation:', error);
    response.status(500).send('Error during fetch list operation');
  }
});

// Get a number of Consumption Points
router.get('/consumptionPoints/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  try {
    next();
  } catch (error) {
    console.error('Error during count operation:', error);
    response.status(500).send('Error during count operation');
  }
});

// Get a Consumption Point (Record ID)
router.get('/consumptionPoints/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  try {
    next();
  } catch (error) {
    console.error('Error during get record operation:', error);
    response.status(500).send('Error during get record operation');
  }
});

// Export a list of Consumption Points
router.get('/consumptionPoints.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  try {
    next();
  } catch (error) {
    console.error('Error during export operation:', error);
    response.status(500).send('Error during export operation');
  }
});

// Delete a list of Consumption Points
router.delete('/consumptionPoints', permissionMiddlewareCreator.delete(), (request, response, next) => {
  try {
    next();
  } catch (error) {
    console.error('Error during delete list operation:', error);
    response.status(500).send('Error during delete list operation');
  }
});

module.exports = router;
