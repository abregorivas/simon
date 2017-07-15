const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.port || 3000;

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('index.html');
});

app.listen(PORT, (err) => {
  console.log(err || `listening on port: ${PORT}`);
});
