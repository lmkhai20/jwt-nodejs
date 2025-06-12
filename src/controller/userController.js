import userApiService from '../service/userApiService';

let readFunc = async (req, res) => {
    try {

        if(req.query.page && req.query.limit){
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await userApiService.getUserWithPaginate(+page, +limit);

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })

        } else {
            let data = await userApiService.getAllUser();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error form server', // error message
            EC: -1, // error code
            DT: '' // data
        })
    }
}

let createFunc = async (req, res) => {
    try {
        let data = await userApiService.createNewUser(req.body);

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
        let data = await userApiService.deleteUser(req.body.id);
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
    createFunc,
    updateFunc,
    deleteFunc
}