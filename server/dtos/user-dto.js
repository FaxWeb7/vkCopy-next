module.exports = class UserDto {
  email;
  firstName;
  lastName;
  avatarPath;
  id;
  isActivated;
  posts;
  friends;
  
  constructor(model){
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.avatarPath = model.avatarPath;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.posts = model.posts;
    this.friends = model.friends;
  }
}