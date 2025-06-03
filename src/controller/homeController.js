import userService from '../service/userService';

const handleHelloWorld = (req, res) => {
    return res.render('home.ejs');
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();

    // console.log('user list: ', userList);
    // userList = JSON.stringify(userList)
    return res.render('user.ejs', {userList});
}

const handleCreateNewUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // let check = bcrypt.compareSync(password, hashPassword);
    await userService.createNewUser(email, password, username);
    
    return res.redirect('/user');
}

let handleDeleteUser = async (req, res) => {
    let userId = req.params.id;
    console.log(">>> check userId: ", userId);
    await userService.deleteUser(userId);
    // let user = await userService.findUserById(userId);
    // console.log('>>> check user delete: ', user);
    return res.redirect('/user');
}

let handleGetUserEdit = async (req, res) => {
    let user = await userService.findUserById(req.params.id);
    console.log('>>> check user edit: ', user);
    return res.render('edit-user.ejs', {user});
}

let handleEditUser = async (req, res) => {
    // let email = req.body.email;
    // let username = req.body.username;
    let data = req.body;
    await userService.editUser(data);
    return res.redirect('/user');
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    handleGetUserEdit,
    handleEditUser
}