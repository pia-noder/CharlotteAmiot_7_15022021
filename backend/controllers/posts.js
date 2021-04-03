const db = require('../db/postsDB');
const db = require('../db/commentsDB');
const fs = require('fs');


exports.getAllPosts = async (req, res) => {
    try {
        let results = await db.getAllPosts();
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
};

exports.getOnePost = async ( req,res ) => {
    try {
        let results = await db.getOnePost(req.params.id);
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
};

exports.createPost = async (req, res) => {

    const fileURL = req.file ? `${req.protocol}://${req.get('host')}/multimedia/${req.file.filename}` : null;
    try {    
        await db.createPost(req.body.contenu, req.body.userId, fileURL);
        let post = await db.findLastPost();
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}



exports.deleteOnePost = async (req, res) => {
    try {
        console.log('nous sommes au niveau du controller')
        console.log(req.body)
       await db.getfileURL(req.body.id_post)
       .then(file => {
           
            file = JSON.stringify(file);
            fileLisible = JSON.parse(file);
            console.log(fileLisible[0].fileURL)

           if(fileLisible[0].fileURL){
               
                console.log(fileLisible[0].fileURL, 'fileLisible');

                const filename = fileLisible[0].fileURL.split('/multimedia/')[1];
                fs.unlink(`multimedia/${filename}`, error => {
                if(error){
                    console.log(error)
                }
                db.deleteOnePost(req.body.id_post);
                db.deleteAssociedComments(req.body.id_post)
                res.status(200).json({message: 'Post correctement supprimé'})
                })
           } else {
               
                db.deleteOnePost(req.body.id_post);
                res.status(200).json({message: 'Post correctement supprimé'})
           }
    
       })
        .catch(error => { res.status(401).json({error})})
       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}


exports.likeOnePost = async(req, res ) => {
    try {
    await db.likeOnePost(req.params.id, req.body.likes, req.body.id_user);
        res.status(200).json({message: 'Modication du like correctement effectué'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}

exports.dislikeOnePost = async(req, res ) => {
    try {
        await db.dislikeOnePost(req.params.id, req.body.likes, req.body.id_user);

        res.status(200).json({message: 'Suppression like correctement effectué'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}

exports.likesStatusInfo = async (req, res) => {
    try {
        const results = await db.likesStatusInfo(req.params.id, req.body.id_user);
        res.status(200).send(results)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}

