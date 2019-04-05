const Ad = require("./models").Ad;

module.exports = {

  getAllAds(callback) {
    return Ad.all()

    .then((ads) => {
      callback(null, ads);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getAd(id, callback) {
    return Ad.findById(id)
    .then((ad) => {
      callback(null,ad);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
