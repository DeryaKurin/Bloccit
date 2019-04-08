const Ad = require("./models").Ad;

module.exports = {

//#1
  getAllAds(callback){
    return Ad.all()

//#2
    .then((ads) => {
      callback(null, ads);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addAd(newAd, callback) {
      return Ad.create({
        title: newAd.title,
        description: newAd.description
      })
      .then((ad) => {
        callback(null, ad);
      })
      .catch((err) => {
        callback(err);
      })
    }
}
