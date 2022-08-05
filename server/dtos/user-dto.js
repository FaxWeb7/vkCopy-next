module.exports = class UserDto {
  email;
  firstName;
  lastName;
  id;
  isActivated;
  
  constructor(model){
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}