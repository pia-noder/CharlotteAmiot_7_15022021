const db = require('../db/postsDB');


exports.getAllPosts = async (req, res) => {
    try {
        //res.status(200).json({message: "Data arrivées au controller !"})
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
        
        const results = await db.createPost(req.body.contenu, req.body.userId, fileURL);
        res.status(201).json({message: 'Post correctement créé'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}



exports.deleteOnePost = async (req, res) => {
    try {
        console.log(req.body.id_post)
        const results = await db.deleteOnePost(req.body.id_post);
        res.status(200).json({message: 'Post correctement supprimé'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}

