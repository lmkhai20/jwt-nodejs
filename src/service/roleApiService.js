import db from '../models/index';

const createNewRoles = (roles) => {
    return new Promise( async (resolve, reject) => {
        try {
            let currentRoles = await db.Role.findAll({
                attributes: ['url', 'description'],
                raw: true
            })

            const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2}) => url1 === url2));

            if(persists.length === 0){
                resolve({
                    EM: 'Nothing create', // error message
                    EC: 0, // error code
                    DT: [] // data
                })
            } else {
                await db.Role.bulkCreate(persists);
                resolve({
                    EM: `Create success ${persists.length} roles`, // error message
                    EC: 0, // error code
                    DT: [] // data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

const getAllRoles = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.Role.findAll({
                raw: true,
                order: [['id', 'DESC']]
            })
            resolve({
                EM: `Get all roles success`, // error message
                EC: 0, // error code
                DT: data // data
            })
        } catch (e) {
            reject(e);
        }
    })
}

const deleteRole = (roleId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let role = await db.Role.findOne({
                where: {id: roleId}
            })

            if(role){
                await role.destroy();
                resolve({
                    EM: 'delete role successfully',
                    EC: 0,
                    DT: []
                })
            } else {
                resolve({
                    EM: 'not found role',
                    EC: 5,
                    DT: []
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewRoles,
    getAllRoles,
    deleteRole
}