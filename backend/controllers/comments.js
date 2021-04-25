const db = require('../db/commentsDB');
const fs = require('fs');

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
        //console.log(error);
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
        //console.log(error);
        res.status(500).json({error});
    }
},

exports.deleteOneComment = async (req, res, next) => {
    try {
        //Récupérer les infos du commentaire à partir de son ID
        await db.getfileURL(req.params.id)
        .then(file => {
            file = JSON.stringify(file);
            fileLisible = JSON.parse(file);
            
            //Si il y un fichier media le supprimer du dossier multimedia sinon passer directement à la suppression du commentaire dans la BDD
            if(fileLisible[0].fileURL){
                
                const filename = fileLisible[0].fileURL.split('/multimedia/')[1];
                console.log(filename)
                //Suppression du fichier du dossier multimedia
                fs.unlink(`multimedia/${filename}`, error => {

                if(error){ console.log(error) }

                db.deleteOneComment(req.params.id);
                res.status(200).json({message: 'Post correctement supprimé'})
                })

            }else{
                db.deleteOneComment(req.params.id);
                res.status(200).json({message: 'Post correctement supprimé'})
                }

            })

        .catch(error => { res.status(401).json({error})})

    } catch (error) {
        //console.log(error);
        res.status(500).json({error});
    }
}

exports.deleteAssociedComments = async (req, res) => {
    try {
        
    } catch (error) {
        //console.log(error);
        res.status(500).json({error});
    }
}