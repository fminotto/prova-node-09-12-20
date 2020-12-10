require('dotenv').config();
const https = require('https');
const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const cors = require("cors");
const app = express();

var apiRoutes = express.Router();

var port = process.env.APP_PORT || 8080; 
var sslport = process.env.APP_SSLPORT || 443; 
var key = fs.readFileSync('./certs/selfsigned.key');
var cert = fs.readFileSync('./certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};
var server = https.createServer(options, app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

app.use('/api', apiRoutes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

require('./src/endpoints')(apiRoutes)

server.listen(sslport, () => {
  console.log("https server starting on port : " + sslport)
});


