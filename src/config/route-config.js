module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const topicRoutes = require("../routes/topics");
    const addRoutes = require("../routes/adds");

    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(addRoutes);
  }
}
