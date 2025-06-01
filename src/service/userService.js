import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import mysql from 'mysql2';


// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt',
});

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    connection.query('INSERT INTO users (email, password, username) VALUES (?,?,?)', [email, hashPassword, username],
        (error, results) => {
            if (error) return res.json({ error: error });
    });
}

const getUserList = () => {
    connection.query('SELECT * FROM users',
        (error, results) => {
            if (error) return res.json({ error: error });
    });
}

module.exports = {
    createNewUser,
    getUserList
}