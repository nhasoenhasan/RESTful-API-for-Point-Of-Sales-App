require ('dotenv/config');
const express = require ('express');
const logger = require ('morgan');
const cors = require('cors');
const bodyParser = require ('body-parser');
const Router = require ('./src/Routes/index');
const server = express ();
const port = 7000;
const nodeEnv = 'Development';

server.use(cors());

// app.listen(port|| 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, port);
// });

server.listen (port || 3000, () => {
  console.log("Express server listening on port %d in %s mode", this.address().port, port);
});
server.use (logger ('dev'));
server.use (bodyParser.json ());
server.use (bodyParser.urlencoded ({extended: false}));
server.use ('/pos', Router);

module.exports = server;
