// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Products = sequelize.define('products', {
    productionStart: {
      type: DataTypes.DATEONLY,
    },
    productionEnd: {
      type: DataTypes.DATEONLY,
    },
    label: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: Sequelize.literal('0.0'),
    },
    volume: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    value: {
      type: DataTypes.DOUBLE,
      defaultValue: Sequelize.literal('0.0'),
    },
    register: {
      type: DataTypes.INTEGER,
    },
    pnl: {
      type: DataTypes.DOUBLE,
      defaultValue: Sequelize.literal('0.0'),
    },
    origoEnergy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    technoId: {
      type: DataTypes.BIGINT,
    },
    geographicZoneId: {
      type: DataTypes.BIGINT,
    },
    dealId: {
      type: DataTypes.BIGINT,
    },
    brokerFees: {
      type: DataTypes.DOUBLE,
      defaultValue: Sequelize.literal('0.0'),
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 'Selectioner la position',
    },
    deliveryMode: {
      type: DataTypes.INTEGER,
      defaultValue: 'Choisir le mode de livraison',
    },
    deliveryDeadline: {
      type: DataTypes.DATEONLY,
    },
    effectiveDelivery: {
      type: DataTypes.DATEONLY,
    },
    brokerName: {
      type: DataTypes.STRING,
    },
    deliveryMailSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    entityId: {
      type: DataTypes.BIGINT,
    },
  }, {
    tableName: 'products',
    underscored: true,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  Products.associate = (models) => {
    Products.belongsTo(models.deals, {
      foreignKey: 'deal_id',
      as: 'deal'
    });
    Products.belongsTo(models.entities, {
      foreignKey: 'entity_id',
      as: 'entity'
    });
    Products.belongsTo(models.technos, {
      foreignKey: 'techno_id',
      as: 'techno'
    });
    Products.belongsTo(models.geographicZones, {
      foreignKey: 'geographic_zone_id',
      as: 'geographicZone'
    });
  };

  return Products;
};