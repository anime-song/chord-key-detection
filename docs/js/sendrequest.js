function sort(x){
    var keys=[];
    for(var key in x)keys.push(key);
    function Compare(a,b){
        return x[b]-x[a];
    }
    keys.sort(Compare);
    return keys
}

function parse(x){
    var js_x = JSON.parse(x)
    key_ = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    var data = {};

    for (var i = 0, tmp; i < js_x.data.prediction.length; i++){
        tmp = js_x.data.prediction[i];
        data[key_[Number(tmp[0])]] = parseFloat(tmp[1]);
    }

    sort_keys = sort(data);
    sort_data = []
    for(var i = 0; i < sort_keys.length; i++){
        sort_data.push({"key": sort_keys[i], "score": (data[sort_keys[i]] * 100.0).toFixed(1)})
    }

    console.log(sort_data);

    return data
};

function send() {
    var http_status;
    var result_data;
    var HTTP_STATUS_OK = 200;
    var HTTP_STATUS_BAD_REQUEST = 400;

    var form = {};
    form.chords = document.getElementById("chords").value.split(" ")

    console.log(form)

    var request_data = JSON.stringify(form);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://chord-key-detection.herokuapp.com/');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(request_data);

    xhr.onreadystatechange = function () {
        var READYSTATE_COMLETED = 4;
        

        if (this.readyState == READYSTATE_COMLETED && this.status == HTTP_STATUS_OK) {
            result_data = this.responseText
            http_status = HTTP_STATUS_OK

        } else if (this.readyState == READYSTATE_COMLETED && this.status == HTTP_STATUS_BAD_REQUEST){
            http_status = HTTP_STATUS_BAD_REQUEST
        }

    };

    xhr.onloadend = function(){
        console.log(result_data)
        if (http_status == HTTP_STATUS_OK){
            parse(result_data)
        } 
    }
};