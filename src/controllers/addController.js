const addQueries = require("../db/queries.adds.js");

module.exports = {
  index(req, res, next) {
    addQueries.getAllAdds((err, adds) => {

      if(err) {
        res.redirect(500, "static/index");
      } else {
        res.render("../views/adds/index", {adds});
      }
    });
  },

  new(req, res, next) {
    res.render("adds/new");
  },

  create(req, res, next) {
    let newAdd = {
      title: req.body.title,
      description: req.body.description
    };
    addQueries.addAdd(newAdd, (err, add) => {
      if (err) {
        res.redirect(500,"/adds/new");
      } else {
        res.redirect(303, "/adds/${add.id}")
      }
    });
  },

  show(req, res, next) {

//#1
     addQueries.getAdd(req.params.id, (err, add) => {

//#2
       if(err || add == null){
         res.redirect(404, "/");
       } else {
         res.render("adds/show", {add});
       }
     });
   }
}
