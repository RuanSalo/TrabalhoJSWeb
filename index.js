const proxy = "https://secret-ocean-49799.herokuapp.com/";
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
		botaoConfirma: document.querySelector(".botaoConfirmar"),
		botaoArmazenaPergunta: document.querySelector(".botaoArmazenaPergunta"),
	},
	selectCategoria: document.querySelector(".selectCategoria"),
};

const carregarCategorias = () => {
	axios.get(`${proxy}https://opentdb.com/api_category.php`).then((response) => {
		const categorias = response.data.trivia_categories;
		for (const categoria of categorias) {
			const option = document.createElement("option");
			option.innerHTML += `<option value="${categoria.id}">${categoria.name}</option>`;
			elementos.selectCategoria.appendChild(option);

		}
	});
}

const novoJogo = () => {
	jogo = {
		dificuldade: undefined,
		categoria: undefined,
		pontos: undefined,
	};

	carregarCategorias();

	elementos.cabecalho.textContent = "Bem Vindo!";
	elementos.texto.textContent = "Selecione a dificuldade e categoria:";
	elementos.botoes.botao1.textContent = "Fácil";
	elementos.botoes.botao2.textContent = "Médio";
	elementos.botoes.botao3.textContent = "Difícil";
	elementos.botoes.botao4.classList.remove("escondido");
	elementos.botoes.botao4.classList.add("escondido");
	elementos.botoes.botaoConfirma.textContent = "Confirmar";
	elementos.botoes.botaoArmazenaPergunta.classList.remove("escondido");
	elementos.botoes.botaoArmazenaPergunta.classList.add("escondido");
};

novoJogo();
