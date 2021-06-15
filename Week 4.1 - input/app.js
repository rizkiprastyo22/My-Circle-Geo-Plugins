const express = require('express');
const path = require('path');

var cors = require('cors')
const app = express();
const port = process.env.PORT || 8080;


app.use(cors());
// app.use('/public', express.static(__dirname + '/public'));
// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../Week 4.1 - input/coba/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);