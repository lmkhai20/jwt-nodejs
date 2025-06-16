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

module.exports = {
    createNewRoles
}