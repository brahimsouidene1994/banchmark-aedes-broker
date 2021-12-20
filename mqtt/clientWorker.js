const express = require('express');
const router = express.Router();
require('events').EventEmitter.defaultMaxListeners = 150;
let mqtt = require('mqtt')
const list =[]
const connectURL='mqtt://localhost:1883';

router.get('/client-worker/:nbr_publisher/:nbr_topic/:nbr_subscriber/:size_payload/:type_qos/:client_id/:nbr_tests',function(request, response){
    // console.log(request.params);
    const {
        size_payload ,
        nbr_publisher,
        nbr_subscriber,
        nbr_topic,
        type_qos,
        client_id,
        nbr_tests
    }=request.params;
    response.sendFile(__dirname + '/client.html');
    const client = mqtt.connect(connectURL,client_id);
    createSubs(response,client,nbr_subscriber, nbr_topic)
  
    let msg_generated = generateMSG(size_payload)
    let i = 0 
    while((nbr_tests-i)>0){
        createPubs(client,nbr_publisher,nbr_topic, msg_generated,type_qos)
        i+=1
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
const createPubs=(client,Nbr_Pubs,Nbr_topic,msg,qos)=>{
    for(j=0;j<Nbr_topic;j++){
        let topic = "topic"
        topic+=j;
        for(i=0;i<Nbr_Pubs;i++){
            client.on('connect',()=>{
                client.publish(topic, msg,qos)
            })
        }
    }
}
const createSubs=(res,client,Nbr_subs,Nbr_topic)=>{
    for(i=0;i<Nbr_subs;i++){
        let topicOfSub = "topic"
        for(j=0;j<Nbr_topic;j++){
            topicOfSub+=j;
            client.on('message', (topicOfSub,message)=>{
                message = message.toString();
                console.log(topicOfSub,' test //',i,message);
                list.push('message')
            })
            client.on('connect', ()=>{
                client.subscribe(topicOfSub)
            })
        }
    }
    console.log(list);
}
const fnTest= (message, list)=>{  
    list.push(message)
    console.log(list);
}
module.exports = router;

