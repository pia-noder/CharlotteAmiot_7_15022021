const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('./middleware/multer');

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


//Modifier les headers pour accepter les requêtes venant de tous les serveurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  //importation des routes 
  const userRoute = require('./routes/users');
  const postsRoute = require('./routes/posts');



app.use(bodyParser.json());
app.use('/auth', userRoute);
app.use('/posts', postsRoute);

//bloc pour les tests de receptions des infos au niveau du backend
/*app.use('/posts', multer, (req,res) => {
  res.status(200).json(req.body);
  console.log('Envoie depuis front-logIn jusqu au serveur est OK')
  console.log(req.body);
})*/

/*app.use(helmet());




//Enregistrement des routes
app.use('/images',express.static(path.join(__dirname,'images')));*/



module.exports = app;
