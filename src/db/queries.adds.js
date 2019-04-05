const Add = require("./models").Add;

module.exports = {

  getAllAdds(callback) {
    return Add.all()

    .then((adds) => {
      callback(null, adds);
    })
    .catch((err) => {
      callback(err);
    })
  },
  
  getAdd(id, callback) {
    return Add.findById(id)
    .then((add) => {
      callback(null,add);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
