import express from 'express';
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';


const router = express.Router();

// const checkUserLogin = (req, res, next) => {
//     const nonSecurePaths = ['/', '/login', '/register'];
//     if(nonSecurePaths.includes(req.path)) return next();


//     next();
// }
const initApiRoutes = (app) => {

    // router.get('/api/test-api', homeController.testApi);
    router.get('/test-api', apiController.testApi);
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);

    router.get('/user/read', checkUserJWT, checkUserPermission, userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);


    router.get('/group/read', groupController.readFunc);


    return app.use('/api/v1/', router);
}

export default initApiRoutes;