const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { arInternalMetadata } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('arInternalMetadata');

// Create a Ar Internal Metadatum
router.post('/arInternalMetadata', permissionMiddlewareCreator.create(), (request, response, next) => {
  next();
});

// Update a Ar Internal Metadatum
router.put('/arInternalMetadata/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  next();
});

// Delete a Ar Internal Metadatum
router.delete('/arInternalMetadata/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

// Get a list of Ar Internal Metadata
router.get('/arInternalMetadata', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a number of Ar Internal Metadata
router.get('/arInternalMetadata/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a Ar Internal Metadatum
router.get('/arInternalMetadata/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  next();
});

// Export a list of Ar Internal Metadata
router.get('/arInternalMetadata.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  next();
});

// Delete a list of Ar Internal Metadata
router.delete('/arInternalMetadata', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

module.exports = router;
