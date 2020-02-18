const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const log = require('./server/db/log');
const morgan = require('morgan')
const cors = require('cors')
var app = express();

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

/* ==================
         Logs 
   ==================
*/
/* Get all logs */
app.get('/log', (req, res) => {
    log.getAll().then((log) => {
        res.json(log);
    });
});
/* Add a log */
app.post('/log', (req, res) => {
    console.log(req.body);
    log.create(req.body).then((log) => {
        res.json(log);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});
/* Delete a log */
app.delete('/log/:id', (req, res ) => {
    console.log(req.body);
    log.remove(req.params.id).then((log) => {
       res.json(log);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});
    
const port = process.env.PORT || 80;
app.listen(port);