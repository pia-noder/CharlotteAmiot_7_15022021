const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

//Use connection pooling to improve the performance of MySQL and not overload the MySQL server with too many connections. 
const pool = mysql.createPool({
    connectionLimit : 20,
    host            : process.env.BdD_HOST,
    user            : process.env.BdD_USER,
    password        : process.env.BdD_PASSWORD,
    database        : process.env.BdD_DATABASE,
    multipleStatements: true
});

let groupomaniadb = {};

//retourne toutes les fonctions vers la base de données
groupomaniadb.getAllComments = (post_id) => {
        return new Promise ((resolve, reject) => {
            pool.query(`SELECT Comments.id AS comments_id, Comments.contenu, Comments.date_publication,Comments.user_id AS comments_user, Comments.fileURL, Users.username AS user_name, Users.imageURL FROM Comments LEFT JOIN Users ON Comments.user_id = Users.id WHERE Comments.post_id = ?`, [post_id] ,(error, results) => {
                if(error){
                    
                    return reject(error);
                }
                    
                    return resolve(results)

            });
        });
};
groupomaniadb.findLastComment = () => {
    return new Promise ((resolve, reject) => {
        pool.query(`SELECT Comments.id AS comments_id, Comments.contenu, Comments.date_publication,Comments.user_id AS comments_user, Comments.fileURL, Users.username AS user_name, Users.imageURL FROM Comments LEFT JOIN Users ON Comments.user_id = Users.id ORDER BY comments_id DESC LIMIT 1`, (error, results) => {
            if(error){
                return reject(error);
            }
                return resolve(results);
        });
    });
}
groupomaniadb.getOneOfAllComments = (post_id, limit) => {
    
        return new Promise ((resolve, reject) => {
            pool.query(`SELECT Comments.id AS comments_id, Comments.contenu, Comments.date_publication,Comments.user_id AS comments_user, Comments.fileURL, Users.username AS user_name, Users.imageURL FROM Comments LEFT JOIN Users ON Comments.user_id = Users.id WHERE Comments.post_id = ? LIMIT ? ; SELECT COUNT(*) AS count FROM Comments WHERE post_id = ?`, [post_id, limit, post_id] ,(error, results) => {
                if(error){   
                    return reject(error);
                }
                    return resolve(results)

            });
        });
};

groupomaniadb.createComment = (content, user_id, fileURL, post_id ) => {
    return new Promise ((resolve, reject) => {
        pool.query(`INSERT INTO Comments (id, contenu, date_publication, post_id, user_id, fileURL) VALUES (0, ?, NOW(), ?, ?, ?)`, [content, post_id, user_id, fileURL] ,(error, results) => {
            if(error){
                return reject(error);

            }
                return resolve(results)

        });
    });
};

groupomaniadb.deleteOneComment = (comment_id ) => {
    return new Promise ((resolve, reject) => {
        pool.query(`DELETE FROM Comments WHERE id = ?`, [comment_id] ,(error, results) => {
            if(error){
                return reject(error);

            }
                return resolve(results);

        });
    });
};

groupomaniadb.deleteAssociatedComments = (post_id) => {
    return new Promise ((resolve, reject) => {
        pool.query(`DELETE FROM Comments WHERE post_id = ?` , [post_id], (error, results) => {
            if(error){
                return reject(error);

            }
                return resolve(results);
        })
    })
}
module.exports = groupomaniadb;