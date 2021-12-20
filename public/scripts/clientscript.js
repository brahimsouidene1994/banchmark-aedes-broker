$scope.classFun = function(){
    console.log('Client triggered class search function...');
    $http({
        url: 'http://localhost:3000/clientWorker/client-worker',
        method: 'POST',
        data: $scope.data
    }).then(function (httpResponse){
        console.log('response', httpResponse);
        var tbody = document.getElementById("class_list_data");
        while(tbody.firstElementChild){
            tbody.removeChild(tbody.firstChild);
        }
        for(var i=0; i<httpResponse.data.length; i++){
            for(var j=0; j<httpResponse.data[i].info.length; j++){
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.appendChild(document.createTextNode(httpResponse.data[i].info[j].Class_Name.toString()));
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    })
}