const chalk = require('chalk');
const path = require('path');
const Liana = require('forest-express-sequelize');
const { objectMapping, connections } = require('../models');

module.exports = async function forestadmin(app) {
  try {
    // Verification des variables d environnement pour eviter des erreurs
    if (!process.env.FOREST_ENV_SECRET) {
      throw new Error("FOREST_ENV_SECRET n est pas defini. Verifiez votre fichier .env.");
    }
    if (!process.env.FOREST_AUTH_SECRET) {
      throw new Error("FOREST_AUTH_SECRET n est pas defini. Verifiez votre fichier .env.");
    }

    // Initialisation de Forest Admin
    app.use(await Liana.init({
      configDir: path.join(__dirname, '../forest'),
      envSecret: process.env.FOREST_ENV_SECRET,
      authSecret: process.env.FOREST_AUTH_SECRET,
      objectMapping,
      connections,
    }));

    console.log(chalk.cyan('Votre panneau d administration est disponible ici : https://app.forestadmin.com/projects'));
  } catch (error) {
    console.error(chalk.red(`Erreur lors de l initialisation de Forest Admin: ${error.message}`));
  }
};
