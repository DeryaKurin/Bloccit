const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {


  new() {
     return this.user != null;
   }

   create() {
     return this.new();
   }

  // #3
   edit() {
     return this._isAdmin() || this._isOwner();
   }

   update() {
     return this.edit();
   }

   destroy() {
     return this.update();
   }
 }
