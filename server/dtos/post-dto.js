module.exports = class PostDto {
  user;
  text;
  image;
  likes;
  comments;
  
  constructor(model){
    this.user = model.user;
    this.text = model.text;
    this.image = model.image;
    this.likes = model.likes;
    this.comments = model.comments;
  }
}