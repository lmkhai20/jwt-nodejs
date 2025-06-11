import db from '../models/index';

let getAllUser = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: ['id', 'username', 'email', 'phone', 'sex'],
                include: { model: db.Group, attributes: ['name', 'description']}
            });
            if(users){
                resolve({
                    EM: 'get all users success', // error message
                    EC: 0, // error code
                    DT: users // data
                })
            } else {
                resolve({
                    EM: 'get all users success', // error message
                    EC: 0, // error code
                    DT: [] // data
                })
            }
        } catch (e) {
            reject({
                EM: 'error form server', // error message
                EC: 1, // error code
                DT: '' // data
            })
        }
    })
}

let getUserWithPaginate = (page, limit) => {
    return new Promise( async (resolve, reject) => {
        try {
            let offset = (page-1)*limit;
            const {count, rows} = await db.User.findAndCountAll({
                offset: offset,
                limit: limit,
                attributes: ['id', 'username', 'email', 'phone', 'sex'],
                include: { model: db.Group, attributes: ['name', 'description']}
            })
            let totalPages = Math.ceil(count/limit);
            let data = {
                totalRows: count,
                totalPages: totalPages,
                users: rows
            }
            resolve({
                EM: 'paginate successfully',
                EC: 0,
                DT: data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createUser = () => {

}

let updateUser = () => {

}

let deleteUser = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: id}
            })

            if(user) {
                await user.destroy();
                resolve({
                    EM: 'delete user successfully',
                    EC: 0,
                    DT: []
                })
            } else {
                resolve({
                    EM: 'not found user',
                    EC: 5,
                    DT: []
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    getUserWithPaginate
}