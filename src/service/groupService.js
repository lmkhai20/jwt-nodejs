import db from '../models/index';

let getGroups = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.Group.findAll({
                order: [
                    ['name', 'ASC']
                ]
            });
            resolve({
                EM: 'get groups successfully',
                EC: 0,
                DT: data
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getGroups
}