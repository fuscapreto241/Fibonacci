document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        const conteudo = botao.nextElementSibling;
        const aberto = conteudo.style.display === "block";
        conteudo.style.display = aberto ? "none": "block";
    });
});

/*SCRIPT LINHA DO TEMPO*/ 
//LINHA DO TEMPO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        pergunta: "Qual regra define a sequência de Fibonacci?",
        alternativas: ["Cada termo é o dobro do anterior", "Cada termo é a soma dos dois termos anteriores", "Cada termo é a subtração dos dois termos anteriores", "Os termos aumentam sempre de 2 em 2"],
        correta: 1,
        explicacao: "Na sequência de Fibonacci, cada termo (a partir do terceiro) é a soma dos dois termos anteriores."
    },
    {
        pergunta: "Quais são os próximos dois termos depois de 0, 1, 1, 2, 3?",
        alternativas: ["4 e 5", "5 e 8", "6 e 9", "8 e 13"],
        correta: 1,
        explicacao: "Somando os dois termos anteriores, depois de 3 vêm 2 + 3 = 5 e 3 + 5 = 8."
    },
    {
        pergunta: "Quais são os dois primeiros termos usados neste site para apresentar a sequência?",
        alternativas: ["1 e 2", "0 e 1", "0 e 2", "1 e 1"],
        correta: 1,
        explicacao: "O exemplo do site começa com 0 e 1; a partir deles, cada termo é formado pela soma dos dois anteriores."
    },
    {
        pergunta: "O que acontece com a razão entre termos consecutivos da sequência à medida que os termos crescem?",
        alternativas: ["Aproxima-se de 1,618", "Aproxima-se de 0", "Torna-se sempre igual a 2", "Permanece sempre igual a 1"],
        correta: 0,
        explicacao: "A razão entre um termo e o anterior tende à proporção áurea, aproximadamente 1,618."
    },
    {
        pergunta: "Quem apresentou a sequência à Europa em seu livro Liber Abaci, em 1202?",
        alternativas: ["Euclides", "Leonardo de Pisa, conhecido como Fibonacci", "Pitágoras", "Isaac Newton"],
        correta: 1,
        explicacao: "Leonardo de Pisa, conhecido como Fibonacci, apresentou o problema dos coelhos no Liber Abaci, publicado em 1202."
    },
    {
        pergunta: "Qual problema aparece no Liber Abaci para ilustrar a sequência?",
        alternativas: ["O crescimento de uma população de coelhos", "A divisão de terras entre herdeiros", "A construção de um aqueduto", "O cálculo da distância entre cidades"],
        correta: 0,
        explicacao: "Fibonacci usou um problema hipotético sobre a reprodução de coelhos para apresentar a sequência."
    },
    {
        pergunta: "Em qual contexto alguns padrões relacionados a Fibonacci podem ser observados nas plantas?",
        alternativas: ["Na organização de folhas e sementes", "Na cor das pétalas, sempre em grupos de cinco", "No tamanho idêntico de todas as folhas", "Na direção fixa em que todas as plantas crescem"],
        correta: 0,
        explicacao: "Em algumas plantas, a disposição de folhas e sementes pode formar padrões relacionados a números de Fibonacci."
    },
    {
        pergunta: "Qual afirmação sobre a presença da sequência na natureza é mais precisa?",
        alternativas: ["Toda forma natural segue perfeitamente a sequência", "Alguns padrões naturais podem se aproximar da sequência, mas nem todos a seguem", "A sequência só aparece em animais", "A sequência determina a cor de todas as flores"],
        correta: 1,
        explicacao: "Algumas estruturas naturais apresentam aproximações de padrões de Fibonacci, mas muitas não seguem a sequência exatamente."
    },
    {
        pergunta: "Qual é o décimo termo da sequência apresentada começando por 0 e 1: 0, 1, 1, 2, ...?",
        alternativas: ["21", "34", "55", "89"],
        correta: 1,
        explicacao: "Contando 0 como o primeiro termo, a sequência é 0, 1, 1, 2, 3, 5, 8, 13, 21, 34."
    },
    {
        pergunta: "Como é chamada a espiral frequentemente desenhada com quadrados cujos lados seguem números de Fibonacci?",
        alternativas: ["Espiral de Arquimedes", "Espiral de Fibonacci", "Espiral logarítmica de Pascal", "Espiral de Newton"],
        correta: 1,
        explicacao: "A espiral de Fibonacci é uma representação geométrica construída a partir de quadrados associados aos termos da sequência."
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}

