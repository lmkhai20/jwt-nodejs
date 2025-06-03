import express from 'express';
import homeController from '../controller/homeController';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloWorld );
    router.get('/user', homeController.handleUserPage );

    router.post('/users/create-user', homeController.handleCreateNewUser );

    router.get('/users/delete-user/:id', homeController.handleDeleteUser);

    router.get('/users/get-user-edit/:id', homeController.handleGetUserEdit);
    router.post('/users/edit-user', homeController.handleEditUser);


    return app.use('/', router);
}

export default initWebRoutes;