const routerChamados = require("./chamadoRouter.js");
const bodyParser = require("body-parser");

module.exports = function (app, express) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(routerChamados);
};
