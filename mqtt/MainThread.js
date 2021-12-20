const express = require('express');
const router = express.Router();

const { Worker, isMainThread } = require('worker_threads');
router.post('/initiate', (req, res) => {
    let __filename = './mqtt/redirector.js';
    const {
        nbr_clients,
        size_payload ,
        nbr_tests ,
        nbr_publisher,
        nbr_subscriber,
        nbr_topic,
        type_qos
    }=req.body;
    if(isMainThread){
        //create clients threads
        for( i = 0; i<nbr_clients;i++){
            let worker = new Worker(__filename);
            worker.postMessage({
                client_id:generateClient(),
                size_payload :size_payload,
                nbr_tests :nbr_tests,
                nbr_publisher:nbr_publisher,
                nbr_subscriber:nbr_subscriber,
                nbr_topic:nbr_topic,
                type_qos:type_qos
            });
        }
    }
})
const generateClient=()=>{
    return  "Client-test-" + Math.floor(Math.random() * (1000));
}

// let measures = []
// //inside main thread
// if (isMainThread) {
//     // setInterval(()=>{
//         for (i = 0; i < nbr_clients; i++) {
//             let start = new Date().getTime()
//             for (j = 0; j < nbr_publisher; j++) {
//                 let worker = new Worker(__filename);
//                 //Send a client id to new thread
//                 worker.postMessage({
//                     //nbr subs
//                     nbr_publisher:nbr_publisher,
//                     payload_size: payload_size,
//                     qos: qos,
//                     nbr_topic: nbr_topic
//                 });
//             }
//             let stop = new Date().getTime()
//             // console.log('start time : '+start+ 'stop time : '+stop)
//             let T = stop - start
//             console.log("Completed in " + T + " ns.")
    
//             measures.push(T)
//             // new Promise(resolve => setTimeout(resolve, 1000));
//         }
//         const reducer = (previousValue, currentValue) => previousValue + currentValue;
//         console.log("-------------------------------------------------------")
//         //console.log(measures.reduce(reducer));
//         avrg = (measures.reduce(reducer)) / nbr_tests
//         console.log("Latency average = ", avrg, " ms")
//         console.log("-------------------------------------------------------")
//         /************************************ */
//     // },5000)
// } 
module.exports = router;