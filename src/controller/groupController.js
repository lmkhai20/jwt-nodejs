import groupService from '../service/groupService';

let readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroups();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
    } catch (e) {
        return res.status(500).json({
            EM: 'error form server', // error message
            EC: -1, // error code
            DT: '' // data
        })
    }
}

module.exports = {
    readFunc
}