require('dotenv').config();

import jwt from 'jsonwebtoken';

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
        // console.log('>>> token: ', token);
    } catch (error) {
        console.log(error);
    }
    return token;
}

const verifyToken = (token) => {
    // verify a token symmetric
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decoded;
    // jwt.verify(token, key, function(err, decoded) {
    //     if(err) {
    //         console.log(err);
    //         return data;
    //     }
    //     // console.log(decoded.foo);
    //     console.log('>>> decoded: ', decoded);
    //     return decoded;
    // });
}

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    if(cookies && cookies.jwt){
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if(decoded) {
            req.user = decoded;
            next()
        } else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated user'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated user'
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if(req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;

        if(!roles || roles.length === 0){
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You dont have permission to access this resource`
            })
        }
        let canAccess = roles.some(item => item.url === currentUrl);
        if(canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You dont have permission to access this resource`
            })
        }

    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated user'
        })
    }
}

module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermission
}