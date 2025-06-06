import db from '../models/index';
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

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
                    password: hashPassword
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

module.exports = {
    registerNewUser
}