module.exports = class ApplicationPolicy {

 // #1
  constructor(user, record) {
    this.user = user;
    this.record = record;
  }



  _isAdmin() {
    return this.user && this.user.role == "admin";
  }

 // #3
  new() {
      return !!this.user;
  }

  create() {
    return this.new();
  }

  show() {
    return true;
  }

 // #4
  edit() {
    return this.new()

  }

  update() {
    return this.edit();
  }

 // #5
  destroy() {
    return this.update();
  }
}
