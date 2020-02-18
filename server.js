const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const morgan = require('morgan')
const cors = require('cors')
var bodyParser = require('body-parser');

var app = express();

app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);