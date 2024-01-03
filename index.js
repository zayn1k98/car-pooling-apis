const http = require('http');

http.createServer(function (req, res) {
    res.write('Home Page'); 
    res.end(); 
  }).listen(8080); 