const postService = require("../services/post-service");

class PostController {
  async addPost(req, res, next){
    try{
      const id = req.params.id
      const {text, image} = req.body
      const postData = await postService.addPost(id, text, image)
      return res.json(postData)
    } catch(e){
      next(e)
    }
  }

  async getPosts (req, res, next){
    try{
      const posts = await postService.getPosts();
      return res.json(posts)
    }catch(e){
      next(e)
    }
  }
}

module.exports = new PostController();