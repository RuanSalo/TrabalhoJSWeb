const proxy = "https://secret-ocean-49799.herokuapp.com/";
const urlBase = "https://opentdb.com/";
let jogo;
const elementos = {
	cabecalho: document.querySelector("#cabecalho"),
	texto: document.querySelector("#texto"),
	telaAlternativas: document.querySelector("#alternativas"),
	telaBotoesFuncionais: document.querySelector("#botoesFuncionais"),
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
	axios.get(`${proxy}${urlBase}api_category.php`).then((response) => {
		const categorias = response.data.trivia_categories;
		for (const categoria of categorias) {
			const option = document.createElement("option");
			option.value = categoria.id;
			option.appendChild(document.createTextNode(categoria.name));
			elementos.selectCategoria.appendChild(option);
		}
	});
};
const carregarJogo = () => {
	jogo.categoria =
		elementos.selectCategoria.options[
			elementos.selectCategoria.selectedIndex
		].value;
	console.log(jogo.categoria);
	console.log(jogo.dificuldade);
	carregarTela();
};
const carregarTela = () => {
	axios
		.get(
			`${proxy}${urlBase}api.php?amount=1&category=${jogo.categoria}&difficulty=${jogo.dificuldade}`
		)
		.then((response) => {
			jogo.pergunta = response.data.results[0];

			console.log(jogo.pergunta);
			elementos.botoes.botao4.classList.remove("escondido");
			elementos.botoes.botaoArmazenaPergunta.classList.remove("escondido");
			elementos.selectCategoria.classList.add("escondido");
			elementos.cabecalho.textContent = `${jogo.pergunta.category}`;
			elementos.texto.textContent = `${jogo.pergunta.question}`;
			elementos.botoes.botao1.textContent = `${jogo.pergunta.correct_answer}`;
			elementos.botoes.botao2.textContent = "resposta 2";
			elementos.botoes.botao3.textContent = "resposta 3";
			elementos.botoes.botao4.textContent = "resposta 4";
			elementos.botoes.botaoConfirma.textContent = "Responder";
			elementos.botoes.botaoArmazenaPergunta.textContent = "Armazenar pergunta";
		});
};
const definirDificuldade = () => {
	elementos.botoes.botao1.addEventListener("click", () => {
		jogo.dificuldade = "easy";
	});
	elementos.botoes.botao2.addEventListener("click", () => {
		jogo.dificuldade = "medium";
	});
	elementos.botoes.botao3.addEventListener("click", () => {
		jogo.dificuldade = "hard";
	});
};
const novoJogo = () => {
	jogo = {
		dificuldade: undefined,
		categoria: undefined,
		pontos: 0,
		pergunta: undefined,
		perguntaArmazenada: undefined,
		chances: 3,
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
	elementos.botoes.botaoConfirma.addEventListener("click", carregarJogo);
	definirDificuldade();
};
novoJogo();
