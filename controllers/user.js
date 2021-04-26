const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

const db = require('../db/usersDB');


exports.signup =  (req, res ) => {
  //res.status(200).json(req.body); //pour débugger
  try {
   const regExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    //password must contain at least 8 characters with 1 lowercase, 1 uppercase,1 numeric character and 1 special character escaping reserved RegExp
    const regExpStrongPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

   if(req.body.email == null || req.body.username == null 
        || req.body.password == null){
      return res.status(400).json({message: "Remplir tous les champs du formulaire !"})
    }
    else if(!regExpEmail.test(req.body.email)){
      return res.status(400).json({message: "Rentrez un format d'email valide !"})
    } 
    else if(!regExpStrongPw.test(req.body.password)){
        return res.status(400).json({message: "Rentrez un mot de passe fort"})
    }
    bcrypt.hash(req.body.password,10)
    .then( hash =>{
      const defaultImg = 'http://localhost:3000/multimedia/profile-user.png';
      //envoie vers la DB
      let results =  db.createUser(req.body.username, req.body.email, hash, defaultImg);
        res.status(201).json(results);
    })
    .catch( error => {
      //console.log(error);
      res.status(400).json({message: 'problème d envoie vers db'});
    });
  } 
  catch (error) {
    //console.log(error); Pour débugger
    res.status(500).json({message:'Problème de formulaire'})
  }
};


exports.login = async (req, res, next) =>{
  try {
    const regExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!regExpEmail.test(req.body.email)){
      return res.status(400).json({message: "Rentrez un format d'email valide !"})
    } 
    let user = await db.loginUser(req.body.email);
    
      bcrypt.compare(req.body.password, user[0].password)
      .then( valid => {
        if(!valid){
          return res.status(400).json({message: 'mot de passe incorrect !'})
        }
          return res.status(200).json({
            userId: user[0].id,
            status: user[0].status,
            user: user[0],
            token: jwt.sign(
              {userId: user[0].id},//pour être sûr que la requête correspond bien à cet userId
              'RANDOM_TOKEN_SECRET',
              {expiresIn: '10h'}
            )
          })
      }).catch( error => res.status(400).json({ error }))
    
    
  } catch (error) {
    //console.log(error); //Pour débugger
    res.status(500).json({message:'Problème de formulaire'})
  }
}

exports.getAllPosts = async ( req, res ) => {
  try {
    let results = await db.getAllPosts(req.params.id);
    
    res.status(200).json(results);
    
  } catch (error) {
    //console.log(error);
    res.status(401).json({ error })
  }
}
exports.getOneUser = async (req, res) => {
  try {
    let results = await db.getOneUser(req.params.id);
    res.status(201).json(results);
  } catch (error) {
    res.status(401).json({ error })
  }
}

exports.updateUser = async (req, res ) => {

    const imageURL = req.file ? `${req.protocol}://${req.get('host')}/multimedia/${req.file.filename}` : req.body.multimedia;

  try {
    await db.updateUser(req.params.id, req.body.username, req.body.poste, req.body.description, imageURL);
    let results = await db.getOneUser(req.params.id);
    res.status(201).json(results);
  } catch (error) {
    res.status(401).json({ error })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await db.deleteUser(req.params.id);
    res.status(200).json({message: 'utilisateur supprimé !'})
  } catch (error) {
    //console.log(error);
    res.status(401).json({ error })
  }
}