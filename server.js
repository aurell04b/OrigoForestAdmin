const express = require('express');
const requireAll = require('require-all');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { Sequelize } = require('sequelize');
const { createAgent } = require('@forestadmin/agent');
const { createSequelizeDataSource } = require('@forestadmin/datasource-sequelize');

// Configuration de Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Changez ce dialecte en fonction de votre base de données (par exemple 'mysql', 'sqlite', etc.)
  logging: false,
});

// Initialisation de l'application Express
const app = express();

let allowedOrigins = [/\.forestadmin\.com$/, /localhost:\d{4}$/, /.*origo\.energy$/];

if (process.env.CORS_ORIGINS) {
  allowedOrigins = allowedOrigins.concat(process.env.CORS_ORIGINS.split(','));
}

const corsConfig = {
  origin: function (origin, callback) {
    console.log(`[CORS Debug] Origin: ${origin}`);
    if (!origin || allowedOrigins.some((regex) => regex.test(origin))) {
      console.log(`[CORS Debug] Origin allowed: ${origin}`);
      callback(null, true);
    } else {
      console.log(`[CORS Debug] Origin not allowed: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Forest-Context-Url', 'Authorization', 'X-Requested-With', 'Content-Type'],
  maxAge: 86400, // NOTICE: 1 day
  credentials: true,
};

// Middleware de journalisation des requêtes
app.use(morgan('combined'));

// Middleware CORS (appliqué globalement avant les routes spécifiques)
app.use(cors(corsConfig));

// Utilisation de bodyParser et cookieParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialisation de l'agent Forest Admin
const agent = createAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === 'production',
});

// Ajout du datasource Sequelize à l'agent
agent.addDataSource(createSequelizeDataSource(sequelize));

// Middleware pour l'agent Forest Admin
app.use(agent.middleware());

// Chargement des routes
requireAll({
  dirname: path.join(__dirname, 'routes'),
  recursive: true,
  resolve: (Module) => {
    if (Module.router) {
      app.use('/forest', Module.router);
    } else {
      app.use('/forest', Module);
    }
  },
});

// Charger les middlewares (si existants)
requireAll({
  dirname: path.join(__dirname, 'middlewares'),
  recursive: true,
  resolve: (Module) => Module(app),
});

// Ajouter un middleware pour intercepter toutes les requêtes qui ne correspondent pas aux routes définies
app.use((req, res, next) => {
  console.log(`[Request Processing Complete] Path: ${req.path}`);
  if (!req.route) {
    console.error(`[404 Not Found] Path: ${req.path}`);
    return res.status(404).json({ error: 'Not Found' });
  }
  next();
});

// Gestionnaire d'erreurs
app.use((err, req, res, next) => {
  console.error(`[Error Handler] Error: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
