const Users = require('../models/userModel');  
const bcrypt = require('bcrypt')
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, firstName, lastName, avatarPath) {
    const candidate = await Users.findOne({email})
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь уже существует!`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4() 

    const user = await Users.create({email, password: hashPassword, firstName, lastName, avatarPath, activationLink, isActivated: false})
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user)
    const lastAvatar = userDto.avatarPath
    const lastPosts = userDto.posts

    userDto.avatarPath = `${process.env.CLIENT_URL}/common/asd.jpg`
    userDto.posts = [{}]
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    userDto.avatarPath = lastAvatar
    userDto.posts = lastPosts

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
    console.log('asd')
    if (!user){
      throw ApiError.BadRequest(`Пользователь ещё не зарегистрирован`)
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password)
    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Пароль введён неверно")
    }
    const userDto = new UserDto(user)
    const lastAvatar = userDto.avatarPath
    const lastPosts = userDto.posts

    userDto.avatarPath = `${process.env.CLIENT_URL}/common/asd.jpg`
    userDto.posts = [{}]
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    userDto.avatarPath = lastAvatar
    userDto.posts = lastPosts

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
    const lastAvatar = userDto.avatarPath
    const lastPosts = userDto.posts

    userDto.avatarPath = `${process.env.CLIENT_URL}/common/asd.jpg`
    userDto.posts = [{}]
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    
    userDto.avatarPath = lastAvatar
    userDto.posts = lastPosts

    return{ ...tokens, user: userDto }
  }

  async getAllUsers () {
    const users = Users.find();
    return users
  }

  async getUser (id) {
    const user = await Users.findById(id)
    if (!user){
      throw ApiError.BadRequest(`Пользователь ещё не зарегистрирован`)
    }
    const userDto = new UserDto(user)
    return userDto
  }

  async changeavatar (id, newAvatarPath) {
    const user = await Users.findById(id)
    if (!user){
      throw ApiError.BadRequest(`Пользователь ещё не зарегистрирован`)
    }
    user.avatarPath = newAvatarPath
    await user.save()
    const userDto = new UserDto(user)
    return userDto
  }

  async addPost (id, text, image) {
    const user = await Users.findById(id)
    if (!user){
      throw ApiError.BadRequest(`Пользователь ещё не зарегистрирован`)
    }
    user.posts.unshift({"text": `${text}`, "image": `${image}`})
    await user.save()
    const userDto = new UserDto(user)
    return userDto
  }

  async deletePost (id, postId) {
    const user = await Users.findById(id)
    if (!user){
      throw ApiError.BadRequest(`Пользователь ещё не зарегистрирован`)
    }
    user.posts.map(({_id}, value) => {
      if (_id == postId){
        user.posts.splice(user.posts[`${value}`], 1)
      }
    })
    await user.save()
    const userDto = new UserDto(user)
    return userDto
  }

  async addLike (id, postId) {
    const user = await Users.findById(id)
    if (!user){
      throw ApiError.BadRequest(`Пользователь ещё не зарегистрирован`)
    }
    user.posts.map(({_id}, value) => {
      if (_id == postId){
        user.posts[`${value}`].likes += 1
      }
    })
    await user.save()
    const userDto = new UserDto(user)
    return userDto
  }

  async deleteLike (id, postId) {
    const user = await Users.findById(id)
    if (!user){
      throw ApiError.BadRequest(`Пользователь ещё не зарегистрирован`)
    }
    user.posts.map(({_id}, value) => {
      if (_id == postId){
        user.posts[`${value}`].likes -= 1
      }
    })
    await user.save()
    const userDto = new UserDto(user)
    return userDto
  }

  async addFriend (id, friendId) {
    const user = await Users.findById(id)
    const friend = await Users.findById(friendId)
    if (!user){
      throw ApiError.BadRequest(`Пользователь ещё не зарегистрирован`)
    }
    if (!friend){
      throw ApiError.BadRequest(`Друг ещё не зарегистрирован`)
    }
    user.friends.map((friend) => {
      if (friend.friendId == friendId){
        throw ApiError.BadRequest(`Вы уже друзья`)
      }
    })
    user.friends.unshift({"friendId": `${friendId}`})
    friend.friends.unshift({"friendId": `${id}`})
    await user.save()
    await friend.save()
    const userDto = new UserDto(user)
    const friendDto = new UserDto(friend)
    return {userDto, friendDto}
  }

  async deleteFriend (id, friendId) {
    const user = await Users.findById(id)
    const friend = await Users.findById(friendId)
    if (!user){
      throw ApiError.BadRequest(`Пользователь ещё не зарегистрирован`)
    }
    if (!friend){
      throw ApiError.BadRequest(`Друг ещё не зарегистрирован`)
    }
    user.friends.map((newfriend, value) => {
      if (newfriend.friendId == friendId){
        user.friends.splice(user.friends[`${value}`], 1)
        friend.friends.splice(friend.friends[`${value}`], 1)
      }
    })
    await user.save()
    await friend.save()
    const userDto = new UserDto(user)
    const friendDto = new UserDto(friend)
    return {userDto, friendDto}
  }
}

module.exports = new UserService();