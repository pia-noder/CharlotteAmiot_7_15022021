const mysql = require('mysql');

//Use connection pooling to improve the performance of MySQL and not overload the MySQL server with too many connections. 
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'bob',
    password        : 'secret',
    database        : 'groupomania',
    port            :  3000
});

let groupomaniadb = {};

//retourne toutes les fonctions vers la base de données
groupomaniadb.allPosts =  () => {
        return new Promise ((resolve, reject) => {
            pool.query(`SELECT * FROM Posts`, (error, results, fields) => {

            });
        });
};

module.exports = groupomaniadb;