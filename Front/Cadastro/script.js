let button = document.getElementById("handleSubmit");

button.onclick = async function (event) {
    event.preventDefault();
    let nome_usuario = document.getElementById("nome_usuario").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let data = {nome_usuario, email, senha}

    const response = await fetch('http://localhost:3001/api/store/task', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });

    let content = await response.json();

    console.log(content);

    if(content.success) {
        alert("Cadastro feito com sucesso!")
        window.location.href = '../Login/login.html';
    } else {
        alert('Algo deu errado');
    }
}