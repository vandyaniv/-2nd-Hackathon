const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const knex = require('./server/config/dbConfig');

const userRoutes = require('./server/routes/userRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 5004;

//
// Connexion à la base de données via Knex
knex
  .raw('SELECT 1')
  .then(() => {
    console.log('Successfully connected to the database via Knex');
  })
  .catch((error) => {
    console.error('Error connecting to the database via Knex', error);
  });

app.use(express.json());

// type error failed loaad ' token not
app.use(
  cors({
    origin: 'http://localhost:5004',
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

// reminder
app.use(express.urlencoded({ extended: true }));

// Serveur statique pour les fichiers du dossier 'public' mean html
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view', 'registration.html'));
});

// next () - is a function express use to pass on other middleware .. create a sequence of middleware

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view', 'login.html'));
}); // session logg issu

app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view', 'userlogged.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view', 'login.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});

// elmrmd@gmail.com
