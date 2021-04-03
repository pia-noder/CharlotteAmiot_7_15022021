
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
groupomaniadb.createUser =  (username, email, password, imageURL) => {
    return new Promise ((resolve, reject) => {
        pool.query(`INSERT INTO users (id, username, email, password, poste, description, imageURL, status) VALUES (0, ? ,?, ?, NULL, NULL, ?, 'basic')`, [username, email, password , imageURL], (error, results) => {
            if(error){
                //console.log('DB Post pas OK !')
                return reject(error);
            }
                //console.log('DB Post OK !')
                return resolve(results);
            });
        });
};

groupomaniadb.loginUser = (email) => {
    return new Promise ((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE email= ? `, [email] , (error, results) => {
            if(error){
                console.log('DB Post pas OK !');
                return reject(error);
            }
                 console.log('DB Post OK !')
                return resolve(results);
        })
    })
}

groupomaniadb.getAllPosts  = (id) => {
    return new Promise ((resolve, reject) => {
        pool.query(`SELECT * FROM Posts WHERE id_user = ?`, [ id ] , (error, results) => {
            if(error){
                console.log('DB Post pas OK !');
                return reject(error);
            }
                console.log('DB Post OK !')
                return resolve(results);
        })
    })
}

groupomaniadb.updateUser = (userId, username, poste, description, imageURL) => {
    return new Promise ((resolve, reject) => {
        pool.query(`UPDATE users SET username = ?, poste = ? , description = ?, imageURL = ?  WHERE id= ?;`, [username, poste, description, imageURL, userId, userId], (error, results) => {
            if(error) {
                console.log('connexion DB pas OK !');
                return reject(error);
            }
                console.log('connexion DB OK !')
                return resolve(results);
        });
    });
}

groupomaniadb.getOneUser = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM Users WHERE id = ?`, [userId], (error, results) => {
            if(error) {
                console.log('connexion DB pas OK !');
                return reject(error);
            }
                console.log('connexion DB OK !')
                return resolve(results);
        });
    });
}

groupomaniadb.deleteUser = (user_id) => {
    console.log('dans la BDD')
    console.log(user_id);
    return new Promise ((resolve, reject) => {
        pool.query(`DELETE FROM users WHERE id = ?`, [user_id], (error, results) => {
            if(error) {
                console.log('connexion DB pas OK !');
                return reject(error);
            }
                console.log('connexion DB OK !')
                return resolve(results);
        });
    });
}


module.exports = groupomaniadb;