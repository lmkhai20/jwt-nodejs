require('dotenv').config();
import db from '../models/index';
import bcrypt from "bcryptjs";
import { Op } from 'sequelize';
const salt = bcrypt.genSaltSync(10);
import { getGroupWithRole } from '../service/JWTService';
import { createJWT } from '../middleware/JWTAction';

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

let checkEmailExist = (userEmail) => {
    return new Promise( async (resolve, reject) => {
        try {
            let check = await db.User.findOne({
                where: { email: userEmail }
            })
            if(check){
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkPhoneExist = (userPhone) => {
    return new Promise( async (resolve, reject) => {
        try {
            let check = await db.User.findOne({
                where: { phone: userPhone }
            })
            if(check){
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let registerNewUser = (userData) => {
    return new Promise( async (resolve, reject) => {
        try {
            let isEmailExist = await checkEmailExist(userData.email);
            if(isEmailExist === true){
                resolve({
                    EM: 'The email is already exist',
                    EC: 5
                })
            }
            let isPhoneExist = await checkPhoneExist(userData.phone);
            if(isPhoneExist === true){
                resolve({
                    EM: 'The phonenumber is already exist',
                    EC: 6
                })
            }

            if(!isEmailExist && !isPhoneExist) {
                let hashPassword = hashUserPassword(userData.password);
                await db.User.create({
                    email: userData.email,
                    phone: userData.phone,
                    username: userData.username,
                    password: hashPassword,
                    groupId: 5
                })

                resolve({
                    EM: 'Created new user',
                    EC: 0
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

let loginUser = async (userData) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    [Op.or]: [
                        { email: userData.valueLogin },
                        { phone: userData.valueLogin }
                    ]
                }
            });

            if(user) {
                let isCorrectPassword = await checkPassword(userData.password, user.password);
                if(isCorrectPassword === true) {

                    // let token =

                    // check role
                    let groupWithRoles = await getGroupWithRole(user);
                    let payload = {
                        email: user.email,
                        username: user.username,
                        groupWithRoles
                    }
                    let token = createJWT(payload);
                    resolve({
                        EM: 'Login succsess',
                        EC: 0,
                        DT: {
                            access_token: token,
                            groupWithRoles,
                            email: user.email,
                            username: user.username
                        }
                    })
                } else {
                    resolve({
                        EM: 'Email or phone is not exist',
                        EC: 6,
                        DT: ''
                    })
                }
            } else {
                resolve({
                    EM: 'Email or phone is not exist',
                    EC: 5,
                    DT: ''
                })
            }
            // console.log('>>> check user email or phone: ', user);  
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    registerNewUser,
    loginUser,
    hashUserPassword,
    checkEmailExist,
    checkPhoneExist
}