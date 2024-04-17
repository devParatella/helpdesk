const express = require("express");
//const cors = require("cors");
const app = express();
const port = 3000;
const database = require("./db/index.js");

app.set("view engine", "ejs");
// Middleware de log antes do CORS
//app.use((req, res, next) => {
  //console.log('Antes do CORS');
//  next();
//});

//app.use(cors());

// Middleware de log depois do CORS
//app.use((req, res, next) => {
  //console.log('Depois do CORS');
 // next();
//});

database();

const router = require("./routers/index.js");

router(app, express);

app.listen(port, (error) => {
  if (error) {
    console.log("Ocorreu um erro ao rodar o servidor!", error);
    return;
  }
  console.log("Servidor rodando com sucesso na porta", port);
});
