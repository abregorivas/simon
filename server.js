const  path = require('path')
const express = require('express')
const app = express();
const router = express.Router();
const PORT = process.env.port || 3000;

//middleware
app.use(express.static(path.resolve(__dirname, 'public')));

// routing
app.get('/', function(res, req){
  res.send(index);
});



app.listen(PORT, function(err) {
  console.log(err || 'listening on port: ' + PORT)
});
