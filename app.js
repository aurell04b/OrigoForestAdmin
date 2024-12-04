const express = require('express');
const requireAll = require('require-all');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { expressjwt } = require('express-jwt');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const { errorHandler, ensureAuthenticated, PUBLIC_ROUTES } = require('forest-express-sequelize');
const { createAgent, createSequelizeDataSource } = require('@forestadmin/agent');

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

// Logger for requests
app.use(morgan('combined'));

// CORS Middleware (applied globally before specific routes)
app.use(cors(corsConfig));

// CORS for authentication route (special case for 'null' origin)
app.use(
  '/forest/authentication',
  cors((req, callback) => {
    const corsOptions = { ...corsConfig };
    if (req.headers.origin === 'null') {
      corsOptions.origin = true; // Accepte l'origine 'null'
    }
    callback(null, corsOptions);
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// JWT Middleware (logging added for debugging purposes)
app.use((req, res, next) => {
  console.log(`[JWT Middleware] Path: ${req.path}`);
  next();
});

app.use(
  expressjwt({
    secret: (req, payload, done) => {
      if (!process.env.FOREST_AUTH_SECRET) {
        console.error('[JWT Middleware] FOREST_AUTH_SECRET is not defined');
        return done(new Error('Authentication secret not defined'));
      }
      console.log(`[JWT Middleware] Using secret: ${process.env.FOREST_AUTH_SECRET}`);
      done(null, process.env.FOREST_AUTH_SECRET);
    },
    algorithms: ['HS256'],
    credentialsRequired: true,
    getToken: (req) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        console.log(`[JWT Middleware] Authorization Header: ${req.headers.authorization}`);
        return req.headers.authorization.split(' ')[1];
      }
      return null;
    },
    audience: process.env.FOREST_AUDIENCE || 'https://app.forestadmin.com',
    issuer: process.env.FOREST_ISSUER || 'origo',
  }).unless({
    path: ['/forest/authentication'], // Ne pas appliquer JWT à l'endpoint d'authentification
  })
);

app.use((req, res, next) => {
  console.log(`[After JWT Middleware] Path: ${req.path}`);
  next();
});

// Ensure authenticated for non-public routes
app.use('/forest', (request, response, next) => {
  console.log(`[Ensure Authenticated] Path: ${request.path}`);
  if (PUBLIC_ROUTES.includes(request.url)) {
    return next();
  }
  
  ensureAuthenticated(request, response, (err) => {
    if (err) {
      console.error(`[Ensure Authenticated] Erreur: ${err.message}`);
      return response.status(401).json({ error: 'Authentication failed' });
    }
    next();
  });
});

// Route pour gérer l'authentification et renvoyer une réponse explicite
app.post('/forest/authentication', (req, res) => {
  console.log('[POST /forest/authentication] Authentication requested');
  
  try {
    if (!process.env.FOREST_AUTH_SECRET) {
      throw new Error('FOREST_AUTH_SECRET is not defined');
    }

    const token = jwt.sign({ user: 'admin' }, process.env.FOREST_AUTH_SECRET, {
      algorithm: 'HS256',
      expiresIn: '8h', // Further extended token expiration to 8 hours
      audience: process.env.FOREST_AUDIENCE || 'https://app.forestadmin.com',
      issuer: process.env.FOREST_ISSUER || 'origo',
    });

    console.log(`[Token Generation] Token content: ${JSON.stringify(jwt.decode(token))}`);

    const responsePayload = {
      token,
      message: 'Authentication successful',
    };

    console.log(`[POST /forest/authentication] Response: ${JSON.stringify(responsePayload)}`);

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error(`[POST /forest/authentication] Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// Initialisation de l'agent Forest Admin
const agent = createAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === 'production',
})
  .addDataSource(createSequelizeDataSource({
    modelsDir: path.join(__dirname, 'models'),
    sequelize: require('./models').sequelize,
  }));

// Utilisation de l'agent comme middleware
app.use('/forest', agent.expressMiddleware());

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

// Error handler middleware configuration
app.use((err, req, res, next) => {
  console.error(`[Error Handler] Error: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
