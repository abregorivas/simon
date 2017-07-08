const  path = require('path')
const express = require('express')
var webpack = require("webpack");
const app = express();
const router = express.Router();
const PORT = process.env.port || 3000;

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', function(res, req){
  res.send(index);
});

app.listen(PORT, function(err) {
  console.log(err || 'listening on port: ' + PORT)
});
