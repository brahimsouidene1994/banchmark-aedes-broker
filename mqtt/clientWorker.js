const express = require('express');
var http = require("http");
const router = express.Router();
require('events').EventEmitter.defaultMaxListeners = 150;
let mqtt = require('mqtt')
const connectURL = 'mqtt://localhost:1883';
router.get('/client-worker/:nbr_publisher/:nbr_topic/:nbr_subscriber/:size_payload/:type_qos/:client_id/:nbr_tests', function (request, response) {
    // console.log(request.params);
    const {
        size_payload,
        nbr_publisher,
        nbr_subscriber,
        nbr_topic,
        type_qos,
        client_id,
        nbr_tests
    } = request.params;
    // response.sendFile(__dirname + '/client.html');
    // response.render('client.ejs', {
    //     context:""
    // })
    const client = mqtt.connect(connectURL, client_id);
    createSubs(response, client, nbr_subscriber, nbr_topic)
    let i = 0
    while ((nbr_tests - i) > 0) {
        createPubs(client, size_payload, nbr_publisher, nbr_topic, type_qos)
        i += 1
    }
})
//generation du payload
const generateMSG = (length) => {
    let message = ""
    let i = 0
    while ((length - i) > 0) {
        message += Math.floor(Math.random() * (10))
        i += 1
    }
    return message
}
const createPubs = (client, sp, Nbr_Pubs, Nbr_topic, qos) => {
    client.on('connect', () => {
        for (j = 0; j < Nbr_topic; j++) {
            for (i = 0; i < Nbr_Pubs; i++) {
                let msg = generateMSG(sp)
                client.publish('topic/' + j, msg, qos)
            }
        }
    })
}

const createSubs = (res, client, Nbr_subs, Nbr_topic) => {
    
    client.on('connect', function () {
        for (j = 0; j < Nbr_topic; j++) {
            for (i = 0; i < Nbr_subs; i++) {        
                client.on('message', function (topic, message) {
                    let context = message.toString();
                    console.log(context);
                })
                client.subscribe('topic/' + j)
            }
        }
    })
    // res.render('client.ejs', 
    // {
    //     'name':'brahim'
    // })

}

const rempliretab =(res, context)=>{
     
}

module.exports = router;

