
function startBroker() {
    fetch('http://localhost:3000/moscabroker/startbroker')
        .then(response => {
            return response.json();
        }).then(data => {
            window.alert(data.broker_text)
        })
        .catch(err => {
            console.log(err)
        })
}

function sendData() {
    let data = {
        nbr_clients: document.getElementById("nbr_clients").value,
        size_payload: document.getElementById("size_payload").value,
        nbr_tests: document.getElementById("nbr_tests").value,
        nbr_publisher: document.getElementById("nbr_publisher").value,
        nbr_subscriber: document.getElementById("nbr_subscriber").value,
        nbr_topic: document.getElementById("nbr_topic").value,
        type_qos: document.getElementById("type_qos").value
    }
    fetch('http://localhost:3000/moscaMainThread/initiate', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => console.log(res));
    
}