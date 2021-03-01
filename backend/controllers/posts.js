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
}

