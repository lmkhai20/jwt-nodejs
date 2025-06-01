import userService from '../service/userService';

const handleHelloWorld = (req, res) => {
    return res.render('home.ejs');
}

const handleUserPage = (req, res) => {
    return res.render('user.ejs');
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // let check = bcrypt.compareSync(password, hashPassword);
    userService.createNewUser(email, password, username);
    
    return res.send('created new user');
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}