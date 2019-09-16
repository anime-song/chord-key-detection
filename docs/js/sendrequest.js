const API_URL = 'https://chord-key-detection.herokuapp.com/'
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQUEST = 400;

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

    console.log(sort_data)

    return sort_data
};

function chordsplit(x){
    var key_ = ["C", "D", "E", "F", "G", "A", "B"];
    var arr_x = Array.from(x)
    var flag = false
    var text = []
    var result_arr = []

    for(var i in arr_x){
        for(var j in key_){
            if (key_[j] == arr_x[i]){
                if (flag){
                    result_arr.push(text.join("").trim())
                    text = []
                }
                flag = true
                break
            }
        }
        if (flag){
            text.push(arr_x[i])
        }
    }
    result_arr.push(text.join("").trim())
    return result_arr
}
function send() {
    deleteTableRow();
    
    programStep(0)
    var http_status;
    var result_data;
    var parse_data;

    var form = {};
    form.chords = chordsplit(document.getElementById("chords").value)
    programStep(25)

    console.log(form)

    var request_data = JSON.stringify(form);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(request_data);
    programStep(50)

    xhr.onreadystatechange = function () {
        var READYSTATE_COMLETED = 4;
        

        if (this.readyState == READYSTATE_COMLETED && this.status == HTTP_STATUS_OK) {
            result_data = this.responseText
            http_status = HTTP_STATUS_OK

        } else if (this.readyState == READYSTATE_COMLETED && this.status == HTTP_STATUS_BAD_REQUEST){
            result_data = this.responseText
            http_status = HTTP_STATUS_BAD_REQUEST
        }

    };

    xhr.onloadend = function(){
        console.log(result_data)
        if (http_status == HTTP_STATUS_OK){
            programStep(75)
            parse_data = parse(result_data)
            for(var i in parse_data){
                addTableRow(parse_data[i]["key"], parse_data[i]["score"]);
            }
            resultKey(parse_data[0]["key"])
            programStep(100)
        }
        else{
            programStep(50, 400)
            errorMessage(JSON.parse(result_data)["error"]["message"])
        }
    }
};