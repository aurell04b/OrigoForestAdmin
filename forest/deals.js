const { collection } = require('forest-express-sequelize')
const models = require('../models/');

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('deals', {
  actions: [{ 
    name: 'Archiver'
  }],
  fields: [{
    field: 'deal_name',
    type: 'String',
    get: (deal) => {
      const newdate = new Date(Date.parse(deal.signatureDate))
      if (deal.signatureDate) {
        return `${deal.entity.name.substring(0,6)}-${newdate.getFullYear() - 2000}${newdate.getMonth() < 9 ? '0' : '' }${newdate.getMonth() + 1}${('0' + newdate.getDate()).slice(-2)}-${deal.id}`
      }
      return `${deal.entity.name.substring(0,6)}--${deal.id}`
    }
  },
  {
    field: 'nb_produits',
    type: 'String',
    get: (deal) => {
      return models.products
      .findAndCountAll({ where: { deal_id: deal.id } })
      .then(results => {
        return results.count;
      });
    }
  },
  {
    field: 'volume',
    type: 'Integer',
    get: (deal) => {
      return models.products
      .findAll({ where: { deal_id: deal.id } })
      .then((results) => {
        result_tmp = 0
        tmp_volume = 0
        for (let i = 0; results[i]; i++) {
          result_tmp = results[i].volume
          if (results[i].position == 1) {
            tmp_volume = tmp_volume - result_tmp
          }
          else {
            tmp_volume = tmp_volume + result_tmp
          }
        }
        return tmp_volume
      });
    }
  },
  {
    field: 'valeur',
    type: 'Integer',
    get: (deal) => {
      tmp_value = 0
      return models.products
      .findAll({ where: { deal_id: deal.id } })
      .then(results => {
        tmp_value = 0
        for (let i = 0; results[i]; i++) {
          tmp_value = tmp_value + (results[i].price * results[i].volume)
        }
        return tmp_value.toFixed(2)
      });
    }
  }],
  segments: [],
})
