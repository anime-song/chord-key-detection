function btnDisable() {

    document.getElementById("btn").disabled = true;

    clearInterval(statusDis);

}
function btnAble() {

    document.getElementById("btn").disabled = false;

    clearInterval(statusAble);

}

function clicked() {

    statusDis = setInterval(btnDisable, 1);

    statusAble = setInterval(btnAble, 3000);

}