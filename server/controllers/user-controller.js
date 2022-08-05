const userService = require('../services/user-service');
const {validationResult} = require("express-validator");
const ApiError = require('../exceptions/api-error');

class UserController {
  async Registration (req, res, next) {
    try{
      const errors = validationResult(req)
      if (!errors.isEmpty()){
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const {email, password} = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  };
  
  async Login (req, res, next) {
    try{
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
}

module.exports = new UserController();