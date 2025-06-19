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

const getRoleByGroup = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!id) {
                resolve({
                    EM: 'Not found role id',
                    EC: 0,
                    DT: []
                })
            } else {
                let roles = await db.Group.findOne({
                    where: {id: id},
                    attributes: ['id', 'name', 'description'],
                    include: [{ 
                        model: db.Role, 
                        attributes: ['id', 'url', 'description'],
                        through: {attributes: []}
                    }]
                })

                resolve({
                    EM: 'Get role by group success',
                    EC: 0,
                    DT: roles
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

const assignRoleToGroup = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            await db.Group_Role.destroy({
                where: {groupId: +data.groupId}
            })
            await db.Group_Role.bulkCreate(data.groupRoles);
            resolve({
                EM: 'Update group-role success',
                EC: 0,
                DT: []
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewRoles,
    getAllRoles,
    deleteRole,
    getRoleByGroup,
    assignRoleToGroup
}