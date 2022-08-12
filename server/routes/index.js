const UserController = require('../controllers/user-controller');
const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router();

router.post('/registration', UserController.Registration);
router.post('/login', UserController.Login);
router.post('/logout', UserController.Logout);
router.get('/activate/:link', UserController.Activate);
router.get('/refresh', UserController.Refresh);
router.get('/users', UserController.getUsers);
router.get('/getuser', UserController.getUser);
router.post('/changeavatar/:id', UserController.changeAvatar)

module.exports = router;


