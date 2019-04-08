const adQueries = require("../db/queries.ads.js");

module.exports = {
  index(req, res, next){
    adQueries.getAllAds((err, ads) => {
      if(err) {
        res.redirect(500, "static/index");
      } else {
        res.render("ads/index", {ads});
      }
    })
  },

  new(req, res, next) {
    res.render("ads/new");
  },

  create(req, res, next) {
    let newAd = {
      title: req.body.title,
      description: req.body.description
    };
    adQueries.addAd(newAd, (err, ad) => {
      if(err) {
        res.redirect(500, "/ads/new");
      } else {
        res.redirect(303, `/ads/${ad.id}`);
      }
    });
  }
}
