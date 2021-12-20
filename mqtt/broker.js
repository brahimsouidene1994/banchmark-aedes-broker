const express = require('express');
const mosca = require('mosca');
var settings = {
    port: 1883
};

const router = express.Router();
router.get('/startbroker', (req, res) => {
     server = new mosca.Server(settings);
        server.on('ready', () => {
            res.status(200).json({broker_text:'broker ready!'})
        }); 
        server.on('published', function(packet, client) {
            console.log('Published', packet.payload.toString());
        });  
})

module.exports = router;