//middleware qui protége les routes sélectionnées et vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes.

const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'Id de l utilisateur non valable';
        }else{
            next();
        }
    }catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée'})
    }
};