const express = require('express');

const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;
// var settings = {
//     port: 1883
// };

const router = express.Router();

// router.get('/startbroker', (req, res) => {
//      server = new mosca.Server(settings);
//         server.on('ready', () => {
//             res.status(200).json({broker_text:'broker ready!'})
//         }); 
//         server.on('published', function(packet, client) {
//             console.log('Published', packet.payload.toString());
//         });  
// })
router.get('/startbroker', (req, res) => {
    server.listen(port, function () {
        // console.log(`MQTT Broker started on port ${port}`);
        res.status(200).json({broker_text:'broker ready!'})
    });
})
module.exports = router;