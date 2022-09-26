const UserController = require('../controllers/user-controller');
const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

router.post('/registration', UserController.Registration);
router.post('/login', UserController.Login);
router.post('/logout', UserController.Logout);
router.get('/activate/:link', UserController.Activate);
router.get('/refresh', UserController.Refresh);
router.get('/users', UserController.getUsers);
router.get('/getuser/:id', UserController.getUser);
router.post('/changeavatar/:id', UserController.changeAvatar)
router.post('/addpost/:id', UserController.addPost);
router.post('/deletepost/:id', UserController.deletePost);
router.post('/addlike/:id', UserController.addLike);
router.post('/deletelike/:id', UserController.deleteLike);
router.post('/addfriend/:id', UserController.addFriend);
router.post('/deletefriend/:id', UserController.deleteFriend);
router.post('/addcomment/:id', UserController.addComment);

module.exports = router;


