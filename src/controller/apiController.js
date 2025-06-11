import authService from '../service/authService';

let testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

let handleRegister = async (req, res) => {
    try {
        if(!req.body.email || !req.body.phone || !req.body.password){
            return res.status(200).json({
                EM: 'Missing required parameters', // error message
                EC: 1, // error code
                DT: '' // data
            })
        } 

        if(req.body.password && req.body.password.length < 4){
            return res.status(200).json({
                EM: 'Password more then 3 characters', // error message
                EC: 2, // error code
                DT: '' // data
            })
        }

        let data = await authService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: '' // data
        })
        
    } catch (e) {
        return res.status(200).json({
            EM: 'error form server', // error message
            EC: -1, // error code
            DT: '' // data
        })
    }
}

let handleLogin = async (req, res) => {
    try {
        let data = await authService.loginUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            EM: 'error form server', // error message
            EC: -1, // error code
            DT: '' // data
        })
    }
}

module.exports = {
    testApi,
    handleRegister,
    handleLogin
}