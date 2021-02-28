const groupomaniadb = require('../db/usersDB');
const db = require('../db/usersDB');



exports.getAllPosts = async (req, res, next) => {
    try {
        let results = await db.allPosts;
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

