import userApiService from '../service/userApiService';
import roleApiService from '../service/roleApiService';

let readFunc = async (req, res) => {
    try {
        let data = await roleApiService.getAllRoles();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error form server', // error message
            EC: -1, // error code
            DT: '' // data
        })
    }
}

let createNewRole = async (req, res) => {
    try {
        let data = await roleApiService.createNewRoles(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error form server', // error message
            EC: -1, // error code
            DT: '' // data
        })
    }
}

let updateFunc = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error form server', // error message
            EC: -1, // error code
            DT: '' // data
        })
    }
}

let deleteFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error form server', // error message
            EC: -1, // error code
            DT: '' // data
        })
    }
}

const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await roleApiService.getRoleByGroup(id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error form server', // error message
            EC: -1, // error code
            DT: '' // data
        })
    }
}

const assignRoleToGroup = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await roleApiService.assignRoleToGroup(req.body.data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error form server', // error message
            EC: -1, // error code
            DT: '' // data
        })
    }
}

module.exports = {
    readFunc,
    createNewRole,
    updateFunc,
    deleteFunc,
    getRoleByGroup,
    assignRoleToGroup
}