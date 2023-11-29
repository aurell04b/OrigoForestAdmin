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

// Smart Action Duplicate
router.post('/actions/duplicate', permissionMiddlewareCreator.smartAction(), (req, res, next) => {
  i = 0;
  while (req.body.data.attributes.ids[i])
  {
    productId = req.body.data.attributes.ids[i]
    console.log(req.body.data.attributes.ids[i])
  
    res.status(204).send();
    models.products
    .findOne({ where: { id: productId } })
    .then((result) => {
      models.products.create({
        productionStart:  result.productionStart,
        productionEnd:  result.productionEnd,
        label:  result.label,
        price:  result.price,
        devise: result.devise,
        volume: result.volume,
        value:  result.value,
        register: result.register,
        pnl:  result.pnl,
        origoEnergy:  result.origoEnergy,
        technoId: result.technoId,
        definitif:  result.definitif,
        geographicZoneId: result.geographicZoneId,
        dealId: result.dealId,
        brokerFees:  result.brokerFees,
        position: result.position,
        deliveryMode: result.deliveryMode,
        deliveryDeadline: result.deliveryDeadline,
        brokerName: result.brokerName,
        entityId: result.entityId,
        technoBis: result.technoBis,
        subvention: result.subvention,
        effectiveDelivery: result.effectiveDelivery,
        deliveryClient: result.deliveryClient,
        labelFees:  result.labelFees,
        cancelFees:  result.cancelFees,
        commentProduct: result.commentProduct,
        technoDeliveryId: result.technoDeliveryId,
        prePaid: result.prePaid,
        geographicZoneDeliveryId: result.geographicZoneDeliveryId,
        exchangeRate: result.exchangeRate,
        paymentDelivery: result.paymentDelivery,
        validityPeriod: result.validityPeriod,
        indexedPrice: result.indexed_price,
        tva: result.tva,
      })
    })
    i += 1
  }
});

// Smart Action Mensualiser
router.post('/actions/mensualiser', permissionMiddlewareCreator.smartAction(), (req, res) => {
  productId = req.body.data.attributes.ids[0]

  return models.products
  .findOne({ where: { id: productId } })
  .then((result) => {
    let _productionStart = new Date(result.productionStart)
    let _productionEnd = new Date(result.productionEnd)
    let _label = result.label
    let _price = result.price
    let _devise = result.devise
    let _volume = (result.volume / 12)
    _volume = _volume.toFixed(0)
    let _value = result.value
    let _register = result.register
    let _pnl = result.pnl
    let _origoEnergy = result.origoEnergy
    let _technoId = result.technoId
    let _geographicZoneId = result.geographicZoneId
    let _dealId = result.dealId
    let _brokerFees = result.brokerFees
    let _position = result.position
    let _deliveryMode = result.deliveryMode
    let _deliveryDeadline = result.deliveryDeadline
    let _brokerName = result.brokerName
    let _definitif = result.definitif
    let _entityId = result.entityId
    let _technoBis = result.technoBis
    let _subvention = result.subvention
    let _labelFees = result.labelFees
    let _cancelFees = result.cancelFees
    let tmp_date = new Date(_productionStart)
    tmp_date.setMonth(tmp_date.getMonth()+1)
    i = 0;
    console.log("tmp_date")
    console.log(tmp_date)
    let _paymentDelivery = result.paymentDelivery
    let _indexedPrice = result.indexedPrice
    let _tva = result.tva

    while (tmp_date < _productionEnd)
    {
      tmp_end = new Date(tmp_date)
      tmp_start = new Date(_productionStart)
      tmp_end.setDate(tmp_end.getDate() - 1)
      tmp_start.setMonth(tmp_start.getMonth() + i)

      models.products.create({
        productionStart:  tmp_start,
        productionEnd:  tmp_end,
        label:  _label,
        price:  _price,
        devise: _devise,
        volume: _volume,
        value:  _value,
        register: _register,
        pnl:  _pnl,
        origoEnergy:  _origoEnergy,
        technoId: _technoId,
        definitif:  _definitif,
        geographicZoneId: _geographicZoneId,
        dealId: _dealId,
        brokerFees:  _brokerFees,
        position: _position,
        deliveryMode: _deliveryMode,
        deliveryDeadline: _deliveryDeadline,
        brokerName: _brokerName,
        entityId: _entityId,
        technoBis: _technoBis,
        subvention: _subvention,
        labelFees: _labelFees,
        cancelFees: _cancelFees,
        paymentDelivery: _paymentDelivery,
        indexedPrice: _indexedPrice,
        tva: _tva,
      })
      tmp_date.setMonth(tmp_date.getMonth()+1)
      i += 1
    }
    tmp_start = new Date(_productionStart)
    tmp_start.setMonth(tmp_start.getMonth() + 11)
    models.products.create({
      productionStart:  tmp_start,
      productionEnd:  _productionEnd,
      label:  _label,
      price:  _price,
      volume: _volume,
      value:  _value,
      register: _register,
      pnl:  _pnl,
      origoEnergy:  _origoEnergy,
      technoId: _technoId,
      definitif:  _definitif,
      geographicZoneId: _geographicZoneId,
      dealId: _dealId,
      brokerFees:  _brokerFees,
      position: _position,
      deliveryMode: _deliveryMode,
      deliveryDeadline: _deliveryDeadline,
      brokerName: _brokerName,
      entityId: _entityId,
      technoBis: _technoBis,
      subvention: _subvention,
      labelFees: _labelFees,
      cancelFees: _cancelFees,
      paymentDelivery: _paymentDelivery,
      indexedPrice: _indexedPrice,
      tva: _tva,
    })

    res.status(204).send()
  })
});

module.exports = router;
