module.exports = class PostDto {
  avatarPath;
  firstName;
  lastName;
  text;
  date;
  
  constructor(model){
    this.avatarPath = model.avatarPath;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.text = model.text;
    this.date = model.date;
  }
}