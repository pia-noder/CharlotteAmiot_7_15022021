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
      console.log(hash);
      console.log(req.body)
      //envoie vers la DB
      let results =  db.createUser(req.body.username, req.body.email, hash);
        res.status(201).json(results);
    })
    .catch( error => {
      console.log(error);
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
    //Récupérer le mot de passe associé à l'email dans la DB
    let user = await db.loginUser(req.body.email);
    console.log(user);
    //Comparer le mot de passe à celui fournit par l'utilisateur 
      bcrypt.compare(req.body.password, results.password)
      .then( valid => {
        //Si c'est pas bon renvoyer un message d'erreur
        if(!valid){
          return res.status(400).json({message: 'mot de passe incorrect !'})
        }
        
          return res.status(200).json({
            message: 'mot de passe OK !'
          })
      }).catch( error => res.status(400).json({ error }))
    
    
    //Si c'est pas bon renvoyer un message d'erreur
  } catch (error) {
    //console.log(error); Pour débugger
    res.status(500).json({message:'Problème de formulaire'})
  }
}