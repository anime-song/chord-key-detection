function parse(x){
    key_ = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]

}

function send() {
    var result_data;
    var form = {};
    form.chords = ["Cm7", "Bm7"]

    var request_data = JSON.stringify(form);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://chord-key-detection.herokuapp.com/');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(request_data);

    xhr.onreadystatechange = function () {
        var READYSTATE_COMLETED = 4;
        var HTTP_STATUS_OK = 200;

        if (this.readyState == READYSTATE_COMLETED && this.status == HTTP_STATUS_OK) {
            result_data = this.responseText
            alert(this.responseText);
            $('[name=result]').val(this.responseText);
        }
    };

    xhr.onload = function(){
        console.log(result_data);
    }
};