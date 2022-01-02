const express = require("express");
var cors = require('cors')

const app = express();
app.set('view engine', 'ejs')
app.use(cors())

const mqttBroker = require('./mqtt/broker')
const mqttMainThread = require('./mqtt/MainThread')
const clientWorker = require('./mqtt/clientWorker')
// const mqttPub = require('./mqtt/Pub')

//import routes
app.use(require('body-parser').json());
app.use('/moscabroker',mqttBroker)
app.use('/moscaMainThread',mqttMainThread)
app.use('/clientWorker',clientWorker)
// app.use('/mosca',mqttPub)
app.use(express.static(__dirname + '/public'));
//Routes 
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});
app.listen(3000,()=>{
    console.log('visit this url http://localhost:3000');
});