import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import mysql from 'mysql2';
import db from '../models/index';


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

const checkUserEmail = (userEmail) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if(user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

const createNewUser = (email, password, username) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let check = await checkUserEmail(email);
            if(check) {
                resolve();
            } else {
                let hashPassword = hashUserPassword(password);
                await db.User.create({ email: email, password: hashPassword, username: username });
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}

let findUserById = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = {};
            user = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: 'password'
                },
                raw: true
            })
            if(user) {
                resolve(user);
            } else {
                resolve(user);
            }
        } catch (e) {
            reject(e);
        }
    })
}

const getUserList = () => {
    return new Promise( async (resolve, reject) => {
        try {
            // test relationship
            let us = await db.User.findOne({
                where: { id: 2 },
                attributes: ['id', 'username', 'email'],
                include: { model: db.Group, attributes: ['name', 'description'] },
                raw: true,
                nest: true
            })

            // console.log('>>>> check new user: ', us);

            let r = await db.Role.findAll({
                include: { model: db.Group , where: { id: 2 }},
                raw: true,
                nest: true
            })

            // console.log('>>>> check user: ', r);



            let users = '';
            users = await db.User.findAll({
                raw: true,
                attributes: {
                    exclude: 'password'
                }
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
}

let deleteUser = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if(user) {
                await user.destroy();
                resolve()
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
}

let editUser = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!data.id) {
                console.log(">>> ko co id");
                resolve();
            } else {
                let user = await db.User.findOne({
                    where: { id: data.id }
                })
                if(user){
                    user.email = data.email;
                    user.username = data.username;
                    await user.save();
                    resolve();
                } else {
                    console.log(">>> ko co user");
                    resolve();
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    findUserById,
    editUser
}