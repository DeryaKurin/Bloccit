const adQueries = require("../db/queries.ads.js");

module.exports = {
  index(req, res, next) {
    adQueries.getAllAdds((err, ads) => {

      if(err) {
        res.redirect(500, "static/index");
      } else {
        res.render("../views/adds/index", {ads});
      }
    });
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
      if (err) {
        res.redirect(500,"/ads/new");
      } else {
        res.redirect(303, "/ads/${ad.id}")
      }
    });
  },

  show(req, res, next) {

//#1
     adQueries.getAd(req.params.id, (err, ad) => {

//#2
       if(err || ad == null){
         res.redirect(404, "/");
       } else {
         res.render("ads/show", {ad});
       }
     });
   }
}
