const { isMainThread, parentPort } = require('worker_threads');
if (!isMainThread) {
    parentPort.once('message', (options) => {
        // console.log(JSON.stringify(options) + ' received from the parent thread!');  
        let i = 0
        var url = `http://localhost:3000/clientWorker/client-worker/${options.nbr_publisher}/${options.nbr_topic}/${options.nbr_subscriber}/${options.size_payload}/${options.type_qos}/${options.client_id}/${options.nbr_tests}`;
        var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
        require('child_process').exec(start + ' ' + url);
        i += 1
    })
}


