require ('dotenv/config');
const express = require ('express');
const logger = require ('morgan');
const cors = require('cors');
const bodyParser = require ('body-parser');
const Router = require ('./src/Routes/index');
const server = express ();
const port = 5000;
const nodeEnv = 'Development';

server.use(cors());

server.listen (port, () => {
  console.log (`Server is running in port ${port} in ${nodeEnv} Mode`);
});
server.use (logger ('dev'));
server.use (bodyParser.json ());
server.use (bodyParser.urlencoded ({extended: false}));
server.use ('/pos', Router);

module.exports = server;
