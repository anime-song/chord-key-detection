$(function () {
    var suggest_list = []
    var $input = $('#chords');
    var $output = $('#result-header');
    var $card = $('#chord-key-card');
    var $table = $('#result-table');
    $input.on('input', function (event) {
        errorMessage("", true)
        if ($input.val() != ""){
            $card.css('display', '');
            $table.css('display', '');
            var value = "「" + $input.val() + "」の調は";
        }else{
            $card.css('display', 'none');
            $table.css('display', 'none');
        }
        
        $output.text(value);
    });
});

function programStep(x, error=0){
    var $progress_bar = $("#progress-bar")
    $progress_bar.css('width', x + "%")
    $progress_bar.attr('aria-valuenow', x)
    if (error != 0){
        $progress_bar.attr('class', "progree-bar progress-bar-striped bg-danger")
    }else{
        $progress_bar.attr('class', "progree-bar progress-bar-striped bg-info")
    }
}
function reset(){
    var input = document.getElementById("chords")

    input.value = ""
    deleteTableRow();
    resultKey("");
    programStep("0");
}
function addTableRow(x, y){
    var table = document.getElementById("result-chord-prob")

    var rows = table.insertRow(-1);

    var cell1 = rows.insertCell(0);
    var cell2 = rows.insertCell(1);

    cell1.innerHTML = String(x);
    cell2.innerHTML = String(y);
}

function deleteTableRow(){
    var table = document.getElementById("result-chord-prob")
    while(table.rows[0]) table.deleteRow(0);
}

function resultKey(x){
    var input = document.getElementById("result-key")
    input.innerHTML = String(x)
}

function errorMessage(x, reset=false){
    if (reset == false){
        var $message = $("#error-msg")
        $message.css('display', '')
        $message.text("ERROR: " + x)
    }else{
        var $message = $("#error-msg")
        $message.css('display', 'none')
    }
}
