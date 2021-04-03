const db = require('../db/commentsDB');

exports.getAllComments = async (req, res, next) =>{
    try {
        
        if(req.query.limit){
            let response = await db.getOneOfAllComments(req.params.id, JSON.parse(req.query.limit));
            res.status(200).json(response)
            
        }else{
            let response = await db.getAllComments(req.params.id);
            res.status(200).json(response);
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
},

exports.createComment = async (req, res, next) => {
    const fileURL = req.file ? `${req.protocol}://${req.get('host')}/multimedia/${req.file.filename}` : null;
    try {
        await db.createComment(req.body.contenu, req.body.userId, fileURL, req.params.postId);
        let comment = await db.findLastComment(); 
        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
},

exports.deleteOneComment = async (req, res, next) => {
    try {
        await db.deleteOneComment(req.params.id);
        res.status(200).json({message: 'Commentaire correctement supprimé !'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}

exports.deleteAssociedComments = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}