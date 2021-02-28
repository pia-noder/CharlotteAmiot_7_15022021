
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
groupomaniadb.createUser =  (username, email, password) => {
    return new Promise ((resolve, reject) => {
        pool.query(`INSERT INTO users (id, username, email, password, poste, description, imageURL) VALUES (0, ? ,?, ?, NULL, NULL, NULL)`, [username, email, password], (error, results) => {
            if(error){
                console.log('Post pas OK !')
                return reject(error);
            }
                console.log('Post OK !')
                return resolve(results);
            });
        });
};

module.exports = groupomaniadb;