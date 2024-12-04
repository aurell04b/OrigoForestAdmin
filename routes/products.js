const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const models = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('products');

// Create a Product
router.post('/products', permissionMiddlewareCreator.create(), (request, response, next) => {
  next();
});

// Update a Product
router.put('/products/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  next();
});

// Delete a Product
router.delete('/products/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

// Get a list of Products
router.get('/products', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a number of Products
router.get('/products/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  next();
});

// Get a Product
router.get('/products/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Exclude "count" manually
  if (request.params.recordId === 'count') {
    return next('route'); // Skip this route if recordId is "count"
  }
  next();
});

// Export a list of Products
router.get('/products.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  next();
});

// Delete a list of Products
router.delete('/products', permissionMiddlewareCreator.delete(), (request, response, next) => {
  next();
});

// Smart Action Duplicate
router.post('/actions/duplicate', permissionMiddlewareCreator.smartAction(), async (req, res, next) => {
  try {
    const ids = req.body.data.attributes.ids;
    for (const id of ids) {
      const product = await models.products.findOne({ where: { id } });
      if (product) {
        await models.products.create({ ...product.dataValues });
      }
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Smart Action Mensualiser
router.post('/actions/mensualiser', permissionMiddlewareCreator.smartAction(), async (req, res, next) => {
  try {
    const productId = req.body.data.attributes.ids[0];
    const product = await models.products.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    const productionStart = new Date(product.productionStart);
    const productionEnd = new Date(product.productionEnd);
    const monthlyVolume = (product.volume / 12).toFixed(0);

    for (let i = 0; i < 12; i++) {
      const startDate = new Date(productionStart);
      startDate.setMonth(startDate.getMonth() + i);

      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() - 1);

      await models.products.create({
        ...product.dataValues,
        productionStart: startDate,
        productionEnd: i === 11 ? productionEnd : endDate,
        volume: monthlyVolume,
      });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
