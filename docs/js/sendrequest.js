function send() {
    var form = {};
    form.chords = ["Cm7", "Bm7"]
    console.log(form)

    var request_data = JSON.stringify(form);
    console.log(request_data)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://chord-key-detection.herokuapp.com/');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(request_data);

    xhr.onreadystatechange = function () {
        var READYSTATE_COMLETED = 4;
        var HTTP_STATUS_OK = 200;

        if (this.readyState == READYSTATE_COMLETED && this.status == HTTP_STATUS_OK) {
            alert(this.responseText);
            $('[name=result]').val(this.responseText);
        } else{
            alert("通信失敗");
        }
    };
};