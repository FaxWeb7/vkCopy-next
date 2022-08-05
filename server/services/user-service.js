const Users = require('../models/userModel');  
const bcrypt = require('bcrypt')
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password) {
    const candidate = await Users.findOne({email})
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует!`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4() 

    const user = await Users.create({email, password: hashPassword, activationLink})
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return{ ...tokens, user: userDto }
  }

  async activate (activationLink) {
    const user = await Users.findOne({activationLink: activationLink});
    if (!user){
      throw ApiError.BadRequest('Некорректная ссылка активации')
    }
    user.isActivated = true;
    await user.save()
  }

  async login (email, password){
    const user = await Users.findOne({email: email})
    if (!user){
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} ещё не зарегистрирован`)
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password)
    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Пароль введён неверно")
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return{ ...tokens, user: userDto }
  }

  async logout (refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    return token
  }

  async refresh (refreshToken) {
    if (!refreshToken){
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await Users.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return{ ...tokens, user: userDto }
  }

  async getAllUsers () {
    const users = Users.find();
    return users
  }
}

module.exports = new UserService();