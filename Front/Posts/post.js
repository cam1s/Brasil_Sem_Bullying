document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3001/api/buscarPosts', {
        method: "GET",
    });

    const result = await response.json();

    if (result.success) {
        const commentsection = document.getElementById('comments');
        result.data.forEach(dados => {
            let id_post = dados.id;
            listarComentarios(id_post);

            const card = document.createElement('div');
            card.className = 'postagem';
            card.id = 'postcard-' + id_post;

            const nomeusuario = document.createElement('h2');
            nomeusuario.className = 'h2-usuario';
            nomeusuario.textContent = dados.nome_usuario;

            if (dados.id_user == localStorage.getItem('id_usuario')) {
                const span = document.createElement("span");
                span.textContent = "você";
                nomeusuario.appendChild(span);
                nomeusuario.className = 'h2-usuario logado';
            }

            const textodiv = document.createElement('div');
            textodiv.className = 'texto-post';

            const textopost = document.createElement('p');
            textopost.className = 'p-post';
            textopost.textContent = dados.texto;

            card.appendChild(nomeusuario);
            textodiv.appendChild(textopost);
            card.appendChild(textodiv);

            // Adiciona a caixa de resposta
            const respostaDiv = document.createElement('div');
            respostaDiv.className = 'resposta-section';

            const respostaInput = document.createElement('input');
            respostaInput.type = 'text';
            respostaInput.placeholder = 'Escreva uma resposta...';
            respostaInput.className = 'input-resposta';
            respostaInput.disabled = !localStorage.getItem('id_usuario'); // Desabilita se não estiver logado

            const respostaBtn = document.createElement('button');
            respostaBtn.className = 'btn-responder';
            respostaBtn.textContent = 'Responder';

            // Desabilita o botão se não estiver logado
            if (!localStorage.getItem('id_usuario')) {
                respostaBtn.disabled = true;
                respostaBtn.style.backgroundColor = '#ccc';  // Indica visualmente que está desabilitado
                respostaBtn.style.cursor = 'not-allowed';
                respostaBtn.title = "Faça login para responder!";
            }

            respostaBtn.addEventListener('click', async () => {
                if (!localStorage.getItem('id_usuario')) {
                    alert('Você precisa estar logado para responder!');
                    return;
                }
                
                let id_usuario = Number(localStorage.getItem('id_usuario'));
                const respostaTexto = respostaInput.value;

                if (respostaTexto) {
                    let respostaData = {
                        id_post,
                        id_usuario, 
                        respostaTexto
                    };

                    const respostaResponse = await fetch('http://localhost:3001/api/salvarResposta', {
                        method: "POST",
                        headers: { "Content-type": "application/json;charset=UTF-8" },
                        body: JSON.stringify(respostaData)
                    });

                    const respostaResult = await respostaResponse.json();
                    if (respostaResult.success) {
                        window.location.reload();
                    } else {
                        console.log("Erro ao responder!", respostaResult.sql);
                    }
                }
            });

            respostaDiv.appendChild(respostaInput);
            respostaDiv.appendChild(respostaBtn);
            card.appendChild(respostaDiv);
            commentsection.appendChild(card);
        });
    } else {
        console.log("Erro!", result.sql);
    }
});



let botao_enviar = document.getElementById("botao_post");

botao_enviar.onclick = async function (e) {
    e.preventDefault();

    let id_usuario = Number(localStorage.getItem('id_usuario'));
    let nome_usuario = localStorage.getItem('nome_usuario');
    let commentText = document.getElementById("commentText").value;

    let data = { id_usuario, nome_usuario, commentText }

    const response = await fetch('http://localhost:3001/api/post', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();

    if (content.success) {
        window.location.reload();
    } else {
        alert(content.message);
    }
};

async function listarComentarios(id_post) {
    const responseComments = await fetch(`http://localhost:3001/api/adicionarResposta/${id_post}`, {
        method: "GET",
    });

    const resultComments = await responseComments.json();
    console.log(resultComments)

    if (resultComments.success) {
        const postCard = document.getElementById(`postcard-${id_post}`);

        // Cria novo contêiner para comentários
        const commentsContainer = document.createElement('div');
        commentsContainer.className = 'comments-container';

        resultComments.data.forEach(comment => {
            const nome = document.createElement('h2');
            nome.className = 'h2-usuario';
            nome.textContent = comment.autor;

            const commentElement = document.createElement('p');
            commentElement.className = 'comment';
            commentElement.textContent = comment.texto; 
            commentsContainer.appendChild(nome);
            commentsContainer.appendChild(commentElement);
        });

        postCard.appendChild(commentsContainer); // Adiciona contêiner de comentários ao post
    } else {
        console.log("Erro ao buscar comentários!");
    }
}

// logout
document.getElementById('button-sair').addEventListener('click', () => {
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('nome_usuario');
    window.location.reload();
});

