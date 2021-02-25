const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
//const helmet = require('helmet');
//const rateLimit = require('express-rate-limit');

//const dotenv = require('dotenv');
//dotenv.config();

const app = express();

//Accès au chemin du notre système de fichiers
//const path = require('path');



//Définir le nombre de requête par période
/*const limiter = rateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requête par windowMs
});*/

//Connexion à la BD
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'pia-noder',
  password: '',
  database: 'gropomania',
});

connection.connect( error => {


  if(error){
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.end();

//Modifier les headers pour accepter les requêtes venant de tous les serveurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use((req,res)=>{
    res.end('Server listening on port 3000')
})

app.use(bodyParser.json());
/*app.use(helmet());

//Enregistrement des routes
app.use('/images',express.static(path.join(__dirname,'images')));*/



module.exports = app;
