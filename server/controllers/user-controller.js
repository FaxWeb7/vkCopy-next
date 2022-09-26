const userService = require('../services/user-service');
const {validationResult} = require("express-validator");
const ApiError = require('../exceptions/api-error');

class UserController {
  async Registration (req, res, next) {
    try{
      const {email, password, firstName, lastName, avatarPath} = req.body;
      const userData = await userService.registration(email, password, firstName, lastName, avatarPath);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  };
  
  async Login (req, res, next) {
    try{
      console.log('sdfa')
      const {email, password} = req.body;
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  };
  
  async Logout (req, res, next) {
    try{
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')

      return res.json(token)
    } catch (e) {
      next(e)
    }
  };
  
  async Activate (req, res, next) {
    try{
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URl)
    } catch (e) {
      next(e)
    }
  };
  
  async Refresh (req, res, next) {
    try{
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  };
  
  async getUsers (req, res, next) {
    try{
      const users = await userService.getAllUsers();
      return res.json(users)
    } catch (e) {
      next(e)
    }
  };

  async getUser (req, res, next) {
    try{
      const id = req.params.id
      const userData = await userService.getUser(id)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  };

  async changeAvatar (req, res, next) {
    try {
      const id = req.params.id;
      const {newAvatar} = req.body;
      const userData = await userService.changeavatar(id, newAvatar)
      return res.json(userData)
    } catch(e){
      next(e)
    }
  }

  async addPost(req, res, next){
    try{
      const id = req.params.id
      const {text, image} = req.body
      const userData = await userService.addPost(id, text, image)
      return res.json(userData)
    } catch(e){
      next(e)
    }
  }

  async deletePost(req, res, next){
    try{
      const id = req.params.id
      const {postId} = req.body
      const userData = await userService.deletePost(id, postId)
      return res.json(userData)
    } catch(e){
      next(e)
    }
  }

  async addLike(req, res, next){
    try{
      const id = req.params.id
      const {postId} = req.body
      const userData = await userService.addLike(id, postId)
      return res.json(userData)
    } catch(e){
      next(e)
    }
  }

  async deleteLike(req, res, next){
    try{
      const id = req.params.id
      const {postId} = req.body
      const userData = await userService.deleteLike(id, postId)
      return res.json(userData)
    } catch(e){
      next(e)
    }
  }

  async addFriend(req, res, next){
    try{
      const id = req.params.id
      const {friendId} = req.body
      const usersData = await userService.addFriend(id, friendId)
      return res.json(usersData)
    } catch(e){
      next(e)
    }
  }

  async deleteFriend(req, res, next){
    try{
      const id = req.params.id
      const {friendId} = req.body
      const usersData = await userService.deleteFriend(id, friendId)
      return res.json(usersData)
    } catch(e){
      next(e)
    }
  }

  async addComment(req, res, next){
    try{
      const id = req.params.id
      const {authorId, text, postId} = req.body
      const userData = await userService.addComment(id, authorId, text, postId)
      return res.json(userData)
    } catch(e){
      next(e)
    }
  }
}

module.exports = new UserController();