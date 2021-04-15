const proxy = "https://cors-anywhere.herokuapp.com/";
let jogo;
const elementos = {
	cabecalho: document.querySelector("#cabecalho"),
	texto: document.querySelector("#texto"),
	telaAlternativas: document.querySelector("#alternativas"),
	animacoes: document.querySelector("#animacoes"),
	botoes: {
		botao1: document.querySelector(".botao1"),
		botao2: document.querySelector(".botao2"),
		botao3: document.querySelector(".botao3"),
		botao4: document.querySelector(".botao4"),
		botaoCategoria: document.querySelector(".botaoCategoria"),
		botaoConfirma: document.querySelector(".botaoConfirmar"),
		botaoArmazenaPergunta: document.querySelector(".botaoArmazenaPergunta"),
	},
	listaCategorias: document.querySelector(".listaCategoriasDropdown")
};

const novoJogo = () => {
	jogo = {
		dificuldade: undefined,
		categoria: undefined,
		pontos: undefined,
	};


	elementos.cabecalho.textContent = "Bem Vindo!";
	elementos.texto.textContent = "Selecione a dificuldade e categoria:";
	elementos.botoes.botao1.textContent = "Fácil";
	elementos.botoes.botao2.textContent = "Médio";
	elementos.botoes.botao3.textContent = "Difícil";
	elementos.botoes.botao4.classList.remove('escondido');
	elementos.botoes.botao4.classList.add('escondido');
	elementos.botoes.botaoConfirma.textContent = "Confirmar";
	elementos.botoes.botaoArmazenaPergunta.classList.remove('escondido');
	elementos.botoes.botaoArmazenaPergunta.classList.add('escondido');
	elementos.botoes.botaoCategoria.addEventListener('click', function () {
		axios
			.get(`${proxy}https://opentdb.com/api_category.php`)
			.then((response) => {
				const categorias = response.trivia_categories;
				listaCategorias.innerHTML = '';
				for (const categoria of categorias) {
					listaCategorias.innerHTML = `<a id="${categoria.id}">${categoria.name}</a>`;
				}
			});
	});
	
};

novoJogo();
