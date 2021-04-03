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
groupomaniadb.getAllPosts =  () => {
        return new Promise ((resolve, reject) => {
            pool.query(`SELECT Posts.id AS id, Posts.contenu, Users.id AS id_user, Users.username, Users.imageURL, Posts.fileURL, Posts.likes, Posts.date_publication, Posts.id_user AS post_user FROM Posts INNER JOIN Users ON Posts.id_user = Users.id ORDER BY id DESC`, (error, results) => {
                if(error){
                    
                    return reject(error);
                }
                    
                    return resolve(results)
            });
        });
};
groupomaniadb.findLastPost = () => {
    return new Promise ((resolve, reject) => {
        pool.query(`SELECT Posts.id AS id, Posts.contenu, Users.id AS id_user, Users.username, Users.imageURL, Posts.fileURL, Posts.likes, Posts.date_publication, Posts.id_user AS post_user FROM Posts INNER JOIN Users ON Posts.id_user = Users.id ORDER BY id DESC LIMIT 1`, (error, results) => {
            if(error){
                return reject(error);
            }
                return resolve(results);
        });
    });
}
groupomaniadb.getOnePost = (id) => {
    return new Promise ((resolve, reject) => {
        pool.query(`SELECT * FROM posts WHERE id= ?`, [ id ] , (error, results) => {
            if(error){
                return reject(error);
            }
                return resolve(results);
        });
    });
}

groupomaniadb.createPost = (contenu, user_id ,fileURL) => {
    return new Promise ((resolve, reject) => {
        pool.query('INSERT INTO Posts (id, date_publication, contenu, id_user, fileURL) VALUES (0, NOW(), ? , ? , ?)', [contenu, user_id, fileURL], (error, results) => {
            if(error) {
                return reject(error);
            }
                return resolve(results);
        });
    });
}

groupomaniadb.deleteOnePost = (id) => {
    return new Promise ((resolve, reject) => {
        pool.query(`DELETE FROM posts WHERE id = ?`, [id], (error, results) => {
            if(error) {
                return reject(error);
            }
                return resolve(results);
        })
    })
}

groupomaniadb.getfileURL = (id_post) => {
    return new Promise ((resolve, reject) => {
        pool.query(`SELECT fileURL FROM Posts WHERE id = ?`, [id_post], (error, results) => {
            if(error) {
                return reject(error);
            }
                return resolve(results);
        })
    })
}

groupomaniadb.likeOnePost = (id_post, likes, id_user) =>{
    return new Promise ((resolve, reject) => {
        pool.query(`INSERT IGNORE INTO Likes (id, post_id, user_id) VALUES (0, ?, ?); UPDATE Posts SET likes = ? WHERE id = ?`, [id_post, id_user, likes, id_post], (error, results) => {
                            if(error) {
                                return reject(error);
                            }
                                return resolve(results);
                        })
    })
}
groupomaniadb.dislikeOnePost = (id_post, likes, id_user) =>{
    return new Promise ((resolve, reject) => {
        pool.query(`DELETE FROM Likes WHERE post_id = ? AND user_id = ?; UPDATE Posts SET likes = ? WHERE id = ?` ,[id_post, id_user, likes, id_post], (error, results) => {
                            if(error) {
                                return reject(error);
                            }
                                return resolve(results);
                        })
    })
}

groupomaniadb.likesStatusInfo = (post_id, user_id) => {

    return new Promise ((resolve, reject) =>{
        pool.query(`SELECT * FROM Likes WHERE post_id = ? AND user_id = ?`, [post_id, user_id], (error, results) => {
            if(error) {
                return reject(error);
            } 
                return resolve(results);
        })
    })
}

module.exports = groupomaniadb;