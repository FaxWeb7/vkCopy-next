const Posts = require('../models/postModel');
const Users = require('../models/userModel');
const PostDto = require('../dtos/post-dto')

class PostService {
  async addPost (id, text, image) {
    const user = await Users.findById(id)
    if (!user){
      throw ApiError.BadRequest(`Пользователь ещё не зарегистрирован`)
    }
    const newPost = await Posts.create({user: id, text: text, image: image})
    return this.getPosts()
  }
  async getPosts () {
    const posts = await Posts.find();
    return posts
  }
}

module.exports = new PostService();