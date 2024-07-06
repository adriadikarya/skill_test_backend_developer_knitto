const express = require('express');
const moment = require('moment');
const cors = require('cors');
const morganBody = require('morgan-body');
const {errorHandler} = require('./core/error_handler');
const app = express();
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(express.urlencoded());

app.use(express.static('public'));

app.use(cors());

// LOG

// let reqPath = path.join(__dirname, '../');
// let dir = reqPath+`logs/${moment(new Date()).format('YYYY-MM')}`;
// console.log(dir);
// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir, { recursive: true });
// }
// const log = fs.createWriteStream(
//   path.join(reqPath, `/logs/${moment(new Date()).format('YYYY-MM')}`, `${moment(new Date()).format('YYYY-MM-DD')}-express.log`), { flags: "a" }
// );
// const loggerStream = {
//   write: message => {
//     // console.log(message)
//     log.info(message);
//   },
// };


// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     // new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//     // new winston.transports.File({

//     //   format: format.combine(format.timestamp(), loggerFormat),
//     //   // format: `${moment(new Date()).format('YYYY-MM-DD')}-express.log`,
//     //   filename: path.join(__dirname, "../", "logs", "combined.log"),
//     // }),
//   ],
// });

// const loggerStream = {
//   write: message => {
//     logger.info(message);
//   },
// };


morganBody(app, {
  noColors: true,
  // stream: log,
  timezone : 'Asia/Jakarta',
  // dateTimeFormat : 'utc',
  // maxBodyLength: 500,
  // prettify: false,
  filterParameters: ['password'],
});

require('./config/config');

app.listen(gConfig.app.port, () => {
    console.log(`==============================`);
    console.log(`== Aplication host: ${gConfig.app.host}`);
    console.log(`== Listening on port ${gConfig.app.port}! `);
    console.log(`== Environtment: ${gConfig.env}`);
    // console.log(`==============================`);
    // console.log(`== database host: ${gConfig.host}`);
    // console.log(`== database port: ${gConfig.port}`);
    // console.log(`== database username: ${gConfig.username}`);
    console.log(`==============================`);
    console.log("Datetime: "+ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')); 
});
app.use((req, res, next) => {
    console.log("\n\n");
    console.log('============ ENV ===========');
    console.log(`Environtment: ${gConfig.env}`);
    console.log("Datetime: "+ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')); 
    // console.log('============ PATH ===========');
    // console.log(req.path);
    // console.log('============ PAYLOAD BODY ===========');
    // console.log(req.body);
    // console.log('============ PAYLOAD PARAMS ===========');
    // console.log(req.query);
    // console.log('============ CONSOLE ===========');
    next();
});
// Error handler throw exception

app.use('/', routes);

app.get('/', (req, res) => {
    res.status(200).json({ rc: 200, rm: 'Welcome to Tes Coding Backend BTS.id' });
});

// Handler 404 notfound
app.get('*', function(req, res){
    console.log("END: "+ moment(new Date()).format('YYYY-MM-DD HH:mm:ss')); 
    res.status(404).json({message: 'Page not found'});
    // res.send({rc:404, rm:"Page not found!"}, 404);
});

app.use((err, req, res, next) => {
    console.log("END: "+ moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));     
    errorHandler(err, req, res)
});

module.exports = app;