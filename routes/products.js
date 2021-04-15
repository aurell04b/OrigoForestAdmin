const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const models = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('products');

// This file contains the logic of every route in Forest Admin for the collection products:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Product
router.post('/products', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Product
router.put('/products/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Product
router.delete('/products/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Products
router.get('/products', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Products
router.get('/products/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Product
router.get('/products/:recordId(?!count)', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Products
router.get('/products.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Products
router.delete('/products', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

// Smart Action Mensualiser
router.post('/actions/mensualiser', permissionMiddlewareCreator.smartAction(), (req, res) => {
    console.log( req.body.data.attributes.ids[0] )
    productId = req.body.data.attributes.ids[0]
    

    return models.products
    .findById(productId)
    .then((product) => {
      console.log( product )
    })
    //return models.products.create({
    //  production_end:   product.production_end,
    //  label:            product.label,
    //  price:            product.price,
    //  volume:           product.volume,
    //  value:            product.value,
    //  register:         product.register,
    //  pnl:              product.pnl,
    //  origo_energy:     product.origo_energy,
    //  techno_id:        product.techno_id,
    //  geographic_zone_id:   product.geographic_zone_id,
    //  deal_id:          product.deal_id,
    //  broker_fees:      product.broker_fees,
    //  position:         product.position,
    //  delivery_mode:    product.delivery_mode,
    //  delivery_deadline:    product.delivery_deadline,
    //  effective_delivery:   product.effective_delivery,
    //  broker_name:      product.broker_name,
    //  delivery_mail_sent:   product.delivery_mail_sent,
    //});
});

module.exports = router;
