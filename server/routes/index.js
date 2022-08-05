const UserController = require('../controllers/user-controller');
const express = require('express');
const {body} = require("express-validator")
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router();

router.post('/registration', 
      body("email").isEmail(), 
      body("password").isLength({min: 3, max: 32}), 
      UserController.Registration);
router.post('/login', UserController.Login);
router.post('/logout', UserController.Logout);
router.get('/activate/:link', UserController.Activate);
router.get('/refresh', UserController.Refresh);
router.get('/users', authMiddleware, UserController.getUsers);

module.exports = router;


