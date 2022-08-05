const jwt = require('jsonwebtoken');
const Tokens = require('../models/tokenModel')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
    return{
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try{
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch(e){
      return null
    }
  }

  validateRefreshToken(token) {
    try{
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch(e){
      return null
    }
  }

  async saveToken (userid, refreshToken) {
    const tokenData = Tokens.findOne({user: userid})
    if(!tokenData){
      tokenData.refreshToken = await refreshToken;
      return tokenData.save()
    }

    const token = await Tokens.create({user: userid, refreshToken})
    return token
  }

  async removeToken (refreshToken) {
    const tokenData = Tokens.deleteOne({refreshToken: refreshToken})
    return tokenData
  }

  async findToken (refreshToken) {
    const tokenData = Tokens.findOne({refreshToken: refreshToken})
    return tokenData
  }
}

module.exports = new TokenService();