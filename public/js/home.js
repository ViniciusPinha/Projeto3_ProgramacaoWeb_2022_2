var url = "https://reqres.in/api/login";
let usuario = document.querySelector('#inputUname').value;
document.querySelector('#submit_buton').addEventListener("click", function () {
    const parametros = {
        email: document.querySelector('#inputUname').value,
        password: document.querySelector('#inputPsw').value
        //eve.holt@reqres.in
        //cityslicka
    };
    const xmlttp = new XMLHttpRequest();
    xmlttp.open('POST', url);
    xmlttp.setRequestHeader('Content-type', 'application/json');
    xmlttp.send(JSON.stringify(parametros));
    xmlttp.onreadystatechange = function() {
        if (xmlttp.readyState === 4 && xmlttp.status === 200) {
            console.log(xmlttp.responseText)
            document.querySelector('#inputUname').value = '';
            document.querySelector('#inputPsw').value = '';
            document.getElementById("landing-page").style.display = "none";
            document.getElementById("Logincontainer").style.display = "none";
            document.getElementById("nacionalidades").style.display = "block";
            alert("Usuário logado com sucesso!")
        }else {
            document.getElementById("loginErrado").style.display = "block";
        }
    };
})