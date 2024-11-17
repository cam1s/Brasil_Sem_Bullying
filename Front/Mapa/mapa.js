const regioesInfo = {
    norte: "A Região Norte do Brasil é composta por sete estados: Amazonas, Amapá, Acre, Pará, Rondônia, Roraima e Tocantins.",
    nordeste: "A Região Nordeste do Brasil é composta por nove estados: Maranhão, Piauí, Ceará, Rio Grande do Norte, Paraíba, Pernambuco, Alagoas, Sergipe e Bahia.",
    sudeste: "A Região Sudeste do território brasileiro é composta por quatro estados, são eles: São Paulo, Rio de Janeiro, Minas Gerais e Espírito Santo.",
    sul: "A Região Sul do território brasileiro é composta por três estados, são eles: Rio Grande do Sul, Santa Catarina e Paraná.",
    centro: "A Região Centro-Oeste do território brasileiro é composta por três estados e o Distrito Federal, são eles: Mato Grosso, Mato Grosso do Sul e Goiás."
};

function updateInfo(className, event) {
    const titulo = document.getElementById('regiao-titulo2');
    const texto = document.getElementById('regiao-texto2');
    
    // Atualiza o título e o texto da região
    titulo.innerText = className.charAt(0).toUpperCase() + className.slice(1);
    texto.innerText = regioesInfo[className];

    // Cria ou atualiza o botão com href
    let botao = document.getElementById('botao-regiao');
    if (!botao) {
        botao = document.createElement('a');
        botao.id = 'botao-regiao';
        botao.innerText = 'Saiba mais';
        botao.classList.add('botao-regiao'); // Adicione classes de estilo, se necessário
        texto.appendChild(botao);
    }

    // Define o href do botão para a página HTML da região
    botao.href = `Regioes/${className}.html`; // Exemplo: 'norte.html', 'sudeste.html', etc.
    botao.target = '_blank'; // Abre o link em uma nova aba
    
    // Exibe a div de informações e ajusta a posição com base no clique
    const infoDiv = document.getElementById('info');
    infoDiv.style.display = 'block';
    infoDiv.style.left = event.pageX + 'px';
    infoDiv.style.top = event.pageY + 'px';
}

// Adicionando eventos nos elementos com classes das regiões
document.querySelectorAll('.norte, .nordeste, .sudeste, .sul, .centro').forEach(item => {
    const className = item.classList[0]; // Pega a primeira classe do elemento
    item.addEventListener('click', (event) => updateInfo(className, event)); // Passa o evento de clique
});
