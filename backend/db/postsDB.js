const mysql = require('mysql');

//Use connection pooling to improve the performance of MySQL and not overload the MySQL server with too many connections. 
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'groupomania',
    password        : 'GM21/02P7_',
    database        : 'groupomania',
});

let groupomaniadb = {};

//retourne toutes les fonctions vers la base de données
groupomaniadb.getAllPosts =  () => {
        return new Promise ((resolve, reject) => {
            pool.query(`SELECT Posts.id AS id_post, Posts.contenu, Users.id AS id_user, Users.username, Users.imageURL, Posts.fileURL, Posts.date_publication, Posts.id_user AS post_user FROM Posts INNER JOIN Users ON Posts.id_user = Users.id`, (error, results) => {
                if(error){
                    
                    return reject(error);
                }
                    
                    return resolve(results)
            });
        });
};

groupomaniadb.getOnePost = (id) => {
    return new Promise ((resolve, reject) => {
        pool.query(`SELECT * FROM posts WHERE id= ?`, [ id ] , (error, results) => {
            if(error){
                console.log('connexion DB pas OK !')
                return reject(error);
            }
                console.log('connexion DB OK !')
                return resolve(results);
        });
    });
}

groupomaniadb.createPost = (contenu, user_id ,fileURL) => {
    return new Promise ((resolve, reject) => {
        pool.query('INSERT INTO Posts (id, date_publication, contenu, id_user, fileURL) VALUES (0, NOW(), ? , ? , ?)', [contenu, user_id, fileURL], (error, results) => {
            if(error) {
                console.log('connexion DB pas OK !');
                return reject(error);
            }
                console.log('connexion DB OK !')
                return resolve(results);
        });
    });
}

groupomaniadb.deleteOnePost = (id) => {
    return new Promise ((resolve, reject) => {
        pool.query(`DELETE FROM posts WHERE id = ?`, [id], (error, results) => {
            if(error) {
                console.log('Problème de connexion à la DB !');
                return reject(error);
            }
                console.log('Conenxion à la BD réussi !');
                resolve(results);
        })
    })
}
module.exports = groupomaniadb;