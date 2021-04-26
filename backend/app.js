const express = require('express');
const mysql = require('mysql');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


const dotenv = require('dotenv');
dotenv.config();

const app = express();

//Accès au chemin du notre système de fichiers
const path = require('path');


//Définir le nombre de requête par période
const limiter = rateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requête par windowMs
});


//Modifier les headers pour accepter les requêtes venant de tous les serveurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(helmet());

//importation des routes 
const userRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
  

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Enregistrement des routes
app.use('/multimedia', express.static(path.join(__dirname,'multimedia')));

app.use('/auth', limiter, userRoute);
app.use('/posts', postsRoute);

module.exports = app;
