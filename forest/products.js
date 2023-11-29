const { collection } = require('forest-express-sequelize');
const models = require('../models/');

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('products', {
  actions: [{ 
    name: 'Duplicate'
  },
  { 
    name: 'Mensualiser'
  },
  { 
    name: 'Test'
  }],
  fields: [{
    field: 'production_period',
    type: 'String',
    get: (product) => {
      return `${product.productionStart} - ${product.productionEnd}`
    }
  },
  {
    field: 'value',
    type: 'Ingeger',
    get: (product) => {
      return (product.volume * product.price).toFixed(2);
    }
  },
  {
    field: 'definitif',
    type: 'Boolean',
    get: (product) => {
      if (product.effective_delivery) {
        return (true);
      }
      else {
        return (product.definitif);
      }
    }
  },
  {
    field: 'manager',
    type: 'String',
    reference: 'adminUsers.id',
    get: function (product) {
      return models.deals
      .findOne({ where: { id: product.deal_id } })
      .then(result => {
        return models.adminUsers
        .findOne({ where: { id: result.manager_id } })
        .then(manager => {
          return manager
        });
      });
    }
  }],
  segments: [],
})
