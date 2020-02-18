const express = require('express'); //used to create the API
const cors = require('cors'); //allows the client to talk to the front end
const bodyParser = require('body-parser'); //used to allow the back-end to read the data sent from the front end.
const morgan = require('morgan'); //used to log http requests to the console
const serveStatic = require('serve-static');
const log = require('./db/log');
const app = express();
 
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + "/dist"));

app.get('/', (req, res) => {
    res.json({
        message: 'root'
    });
});
 
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
    
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});