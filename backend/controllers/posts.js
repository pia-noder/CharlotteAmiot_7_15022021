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

    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const sauce = {
        ...sauceObject,
        fileUrl: `${req.protocol}://${req.get('host')}/multimedia/${req.file.filename}`
    };
    try {
        console.log(req)
        const results = await db.createPost(sauce);
        res.status(200).json({message: 'Post correctement créé'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}

